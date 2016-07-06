/** @module astrodecorations */
import mapValues from 'lodash/mapValues';
import ensures from './ensures';
import Logger from './Logger';
import ActionsStore from './ActionsStore';
import { makeSecure } from './makers/make-secure';
import { makeOnServer } from './makers/make-server';
import { Match } from 'meteor/check';
const logger = new Logger( 'core' );
const makers = {
    methods: [ makeSecure, makeOnServer ],
    events: [ makeSecure ]
};

let contextualClassName = null;

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
 *
 * @param methodName
 * @return {action_descriptor}
 */
export function getActionDescriptorFromContext( methodName ) {
    return buildActionDescriptor( contextualClassName, methodName );
}

/**
 * @param {!Function} makerFunction - A function that takes 3 params :
 * - the function to wrap
 * - the name of the action (astro class name + field name)
 * - the field name
 * And returns a function.
 * @param {!Array.<string>} plugins - Names of plugins it will be applied on
 */
export function registerMaker( makerFunction, plugins ){
    ensures( 'In `registerWrapper` function : arg `wrapperFunction`', makerFunction, Function );
    ensures( 'In `registerWrapper` function : arg `plugins`', plugins, Array );
    plugins.forEach( (pg) => {
        let wrap = makers[pg];
        ensures( `In \`registerWrapper\` function : arg \`plugins\`, the plugin ${pg} is not a valid target.`, wrap, Object );
        wrap.push( makerFunction );
    });
}

export function decorateEvents( events, className ) {
    if ( Match.test( events, Object )) {
        return mapValues( events, function( eventHandlers, eventName ) {
            if(!Match.test( eventHandlers, Array )) eventHandlers = [ eventHandlers ];
            return eventHandlers.map( function( eventHandler, index ) {
                const eventHandlerName = `${eventName}${index+1}`;
                const actionDescriptor = buildActionDescriptor( className, eventHandlerName );
                logger.trace( 'applying makers to eventHandler', eventHandlerName );
                // register handler
                ActionsStore.register( eventHandler, actionDescriptor );
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
    if(Match.test( methods, Object )) {
        return mapValues( methods, (method, methodName) => {
            const actionDescriptor = buildActionDescriptor( className, methodName );
            logger.trace('applying makers to method', methodName);
            // register method
            ActionsStore.register( method, actionDescriptor );
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
    ensures( 'astro-decorations~decorateDescription, argument >>description', description, Match.ObjectIncluding({
        name: String,
        events: Match.Optional( Object ),
        methods: Match.Optional( Object )
    }) );
    const { name, events, methods } = description;
    const className = name;
    contextualClassName = name;
    description.methods = decorateMethods( methods, className );
    description.events =  decorateEvents( events, className );
    return description;
}




