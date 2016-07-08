/** @module astrodecorations */
import mapValues from 'lodash/mapValues';
import { ensures, ensuresArg, IsNonEmptyString } from './ensures';
import Logger from './Logger';
import { makeSecure } from './makers/make-secure';
import { makeOnServer } from './makers/make-server';
import { Match } from 'meteor/check';
const logger = new Logger( 'core' );
const makers = {
    methods: [ makeSecure, makeOnServer ],
    events: [ makeSecure ]
};


function runIfApiIsOpen( func ) {
    if(!isApiLocked) func();
}

const actionsProperties = new Map();
const descriptorMapper = new Map(); // map descriptors to their actions

let isApiLocked = false;

/* Store methods */
/**
 *
 * @param {!Function} action
 * @param {!string} actionDescriptor
 * @param {!string} actionName
 */
function bindActionToClass( action, actionDescriptor ) {
    let properties = actionsProperties.get( action );
    let actionName = properties.descriptor;
    ensuresArg( 'In method `bindActionToClass` : argument `action`', action, Function );
    ensuresArg( 'In method `bindActionToClass` : argument `className` '+actionDescriptor, actionDescriptor, String );
    descriptorMapper.delete( actionName );
    descriptorMapper.set( actionDescriptor, action );
    properties.descriptor = actionDescriptor;
}


/**
 * A store to retrieve properties associated with actions ( methods or events )
 */
export const ActionsStore = {

    /**
     * Clears the store.
     */
    clear() {
        if(!isApiLocked){
            actionsProperties.clear();
            descriptorMapper.clear();
        }
    },
    /**
     * Remove an action from the store.
     * @param {!Function} action
     */
    unregister( action ) {
        runIfApiIsOpen( () => {
            let descriptor = ActionsStore.getProp( action, 'descriptor' );
            actionsProperties.delete( action );
            if(descriptor) descriptorMapper.delete( descriptor );
            else throw new Error( 'Cannot unregister a non registered action.' );
        });
    },

    /**
     * Check if action is registered
     * @param {!Function} action
     * @returns {boolean}
     */
    hasAction( action ) {
        return !!actionsProperties.get( action );
    },

    /**
     * Register an action (function reference to an event handler or a method)
     * @param {!Function} action
     * @param {action_descriptor} descriptor
     * @throw
     */
    register( action, descriptor ) {
        runIfApiIsOpen( () => {
            let properties = {};
            ensuresArg( 'In method ActionsStore.register` : argument `action`', action, Function );
            ensuresArg( 'In method ActionsStore.register` : argument `descriptor`', descriptor, IsNonEmptyString );
            const actionCandidate = descriptorMapper.get( descriptor );
            if(actionCandidate) throw new Error( `the action ${descriptor} was attempted to be registered while already registered.`);
            descriptorMapper.set( descriptor, action );
            actionsProperties.set( action, properties );
            properties.descriptor = descriptor;
        });
    },

    /**
     * Register or update an action
     * @param {!Function} action
     * @param {action_descriptor} descriptor
     */
    registerOrUpdate( action, descriptor ) {
        runIfApiIsOpen( () => {
            const oldAction = descriptorMapper.get( descriptor );
            if(oldAction) ActionsStore.update( action, descriptor );
            else ActionsStore.register( action, descriptor );
        });
    },
    /**
     * Update an action (function reference to an event handler or a method)
     * @param {!Function} action
     * @param {action_descriptor} descriptor
     * @throw
     */
    update( action, descriptor ) {
        runIfApiIsOpen( () => {
            ensuresArg('ActionsStore.registerOrUpdateAction : argument `action`', action, Function);
            ensuresArg('ActionsStore.registerOrUpdateAction : argument `descriptor`', descriptor, IsNonEmptyString);
            const oldAction = descriptorMapper.get(descriptor);
            const properties = actionsProperties.get(oldAction);
            if (!oldAction || !properties) throw new Error(`the action ${descriptor} was attempted to be updated while not yet registered.`);
            //TODO implement
            //actionsProperties.delete( oldAction );
            actionsProperties.set(action, properties);
            descriptorMapper.set(descriptor, action);
        });
    },

    /**
     * @desc retrieve a property associated with an action
     * @param {!Function} action - the action which property must be found
     * @param propName
     * @return {*|undefined} the property associated with the action if found, undefined otherwise
     */
    getProp( action, propName ) {
        let props = actionsProperties.get( action );
        if(props) return props[propName];
        else throw new Error( 'Cannot get a prop from an unregistered action');
    },

    /**
     * @param {!Function} action
     * @param {!string} propName
     * @param {*} propValue
     * @throw {Error} When action has not yet been registered
     * @throw {Error} When a value was already assigned
     */
    setProp( action, propName, propValue ) {
        runIfApiIsOpen( () => {
            ensuresArg('ActionsStore.setProp : argument action', action, Function);
            ensuresArg('ActionsStore.setProp : argument propName', propName, String);
            const properties = actionsProperties.get(action);
            if (!properties) throw new Error('The provided action is not registered!');
            let oldValue = properties[propName];
            properties[propName] = propValue;
            return oldValue;
        });
    }
};

/**
 *
 * @param {!string} className
 * @param {!string} methodName
 * @return {action_descriptor}
 */
export function buildActionDescriptor( className, methodName ) {
    return `${className}#${methodName}`;
}
/**
 * @param {!Function} makerFunction - A function that takes 3 params :
 * - the function to wrap
 * - the name of the action (astro class name + '#' + field name)
 * - the field name
 * And returns a function.
 * @param {!Array.<string>} plugins - Names of plugins it will be applied on
 */
export function registerMaker( makerFunction, plugins ){
    if(!isApiLocked){
        ensuresArg( 'In `registerWrapper` function : arg `wrapperFunction`', makerFunction, Function );
        ensuresArg( 'In `registerWrapper` function : arg `plugins`', plugins, Array );
        plugins.forEach( ( pg ) => {
            let maker = makers[pg];
            ensuresArg( `In function \`registerMaker\`, the plugin ${pg} is not a valid target.`, maker, Object );
            maker.push( makerFunction );
        });
    }
}



export function decorateEvents( events, className ) {
    if (Match.test( events, Object ) && !isApiLocked) {
        return mapValues( events, function( eventHandlers, eventName ) {
            if(!Match.test( eventHandlers, Array )) eventHandlers = [ eventHandlers ];
            return eventHandlers.map( function( eventHandler, index ) {
                const eventHandlerName = `${eventName}${index?index:''}`;
                const actionDescriptor = buildActionDescriptor( className, eventHandlerName );
                logger.trace( 'applying makers to eventHandler ', actionDescriptor );
                // register handler
                //ActionsStore.register( eventHandler, actionDescriptor );
                if(ActionsStore.hasAction( eventHandler )) bindActionToClass( eventHandler, actionDescriptor );
                else ActionsStore.register( eventHandler, actionDescriptor );
                if(makers.events.length) makers.events.forEach( ( makr ) => {
                    eventHandler = makr( eventHandler, actionDescriptor, eventHandlerName );
                    ActionsStore.update( eventHandler, actionDescriptor );
                });
                return eventHandler;
            });
        });
    } else return events;
}

export function decorateMethods( methods, className ) {
    if(Match.test( methods, Object ) && !isApiLocked) {
        return mapValues( methods, (method, methodName) => {
            const actionDescriptor = buildActionDescriptor( className, methodName );
            logger.trace('applying makers to method ', actionDescriptor);
            // register method
            //ActionsStore.registerOrU( method, actionDescriptor );
            if(ActionsStore.hasAction( method )) bindActionToClass( method, actionDescriptor );
            else ActionsStore.register( method, actionDescriptor );
            if(makers.methods.length) makers.methods.forEach( ( makr ) => {
                method = makr( method, actionDescriptor, methodName );
                ActionsStore.update( method, actionDescriptor );
            });
            return method;
        });
    } else return methods;
}

/**
 *
 * @param {!object} description
 * @param {!string} description.name
 * @param {?object=} description.events
 * @param {?object=} description.methods
 * @return {*}
 */
export function decorateDescription( description ){
    if(!isApiLocked) {
        ensures( 'In function `decorateDescription`, param `description` must be a valid Astro description.', description, Match.ObjectIncluding({
            name: String,
            events: Match.Optional( Object ),
            methods: Match.Optional( Object )
        }));
        const { name, events, methods } = description;
        const className = name;
        description.methods = decorateMethods( methods, className );
        description.events =  decorateEvents( events, className );
        return description;
    }
}

/**
 * Locks the decorators api
 */
export function lockApi() {
    isApiLocked = true;
}




