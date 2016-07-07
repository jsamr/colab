import { ensures, ensuresArg, IsNonEmptyString } from './ensures';
const actionsProperties = new Map();
const descriptorMapper = new Map(); // map descriptors to their actions

/**
 * A store to retrieve properties associated with actions ( methods or events )
 */
const ActionsStore = {

    /**
     * Clears the store.
     */
    clear() {
        actionsProperties.clear();
        descriptorMapper.clear();
    },
    /**
     * Remove an action from the store.
     * @param {!Function} action
     */
    unregister( action ) {
        let descriptor = ActionsStore.getProp( action, 'descriptor' );
        actionsProperties.delete( action );
        if(descriptor) descriptorMapper.delete( descriptor );
        else throw new Error( 'Cannot unregister a non registered action.' );
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
     *
     * @param {!Function} action
     * @param {!string} actionDescriptor
     * @param {!string} actionName
     */
    bindActionToClass( action, actionDescriptor ) {
        let actionName = actionsProperties.get( action ).descriptor;
        ensuresArg( 'In method `ActionsStore.bindActionToClass` : argument `action`', action, Function );
        ensuresArg( 'In method `ActionsStore.bindActionToClass` : argument `className` '+actionDescriptor, actionDescriptor, String );
        descriptorMapper.delete( actionName );
        descriptorMapper.set( actionDescriptor, action );
    },
    /**
     * Register an action (function reference to an event handler or a method)
     * @param {!Function} action
     * @param {action_descriptor} descriptor
     * @throw
     */
    register( action, descriptor ) {
        let properties = {};
        ensuresArg( 'In method ActionsStore.register` : argument `action`', action, Function );
        ensuresArg( 'In method ActionsStore.register` : argument `descriptor`', descriptor, IsNonEmptyString );
        const actionCandidate = descriptorMapper.get( descriptor );
        if(actionCandidate) throw new Error( `the action ${descriptor} was attempted to be registered while already registered.`);
        descriptorMapper.set( descriptor, action );
        actionsProperties.set( action, properties );
        properties.descriptor = descriptor;
    },

    /**
     * Register or update an action
     * @param {!Function} action
     * @param {action_descriptor} descriptor
     */
    registerOrUpdate( action, descriptor ) {
        const oldAction = descriptorMapper.get( descriptor );
        if(oldAction) ActionsStore.update( action, descriptor );
        else ActionsStore.register( action, descriptor );
    },
    /**
     * Update an action (function reference to an event handler or a method)
     * @param {!Function} action
     * @param {action_descriptor} descriptor
     * @throw
     */
    update( action, descriptor ) {
        ensuresArg( 'ActionsStore.registerOrUpdateAction : argument `action`', action, Function );
        ensuresArg( 'ActionsStore.registerOrUpdateAction : argument `descriptor`', descriptor, IsNonEmptyString );
        const oldAction = descriptorMapper.get( descriptor );
        const properties  = actionsProperties.get( oldAction );
        if(!oldAction || !properties) throw new Error( `the action ${descriptor} was attempted to be updated while not yet registered.` );
        //TODO implement
        //actionsProperties.delete( oldAction );
        actionsProperties.set( action, properties );
        descriptorMapper.set( descriptor, action );
    },

    /**
     * @desc retrieve a property associated with an action
     * @param {!Function} action - the action which property must be found
     * @param propName
     * @return {*|undefined} the property associated with the action if found, undefined otherwise
     */
    getProp( action, propName ) {
        ensuresArg( 'ActionsStore.getProp : argument `action` ', action, Function );
        ensuresArg( 'ActionsStore.getProp : argument `propName` ', propName, String );
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
        ensuresArg( 'ActionsStore.setProp : argument action', action, Function );
        ensuresArg( 'ActionsStore.setProp : argument propName', propName, String );
        const properties = actionsProperties.get( action );
        if(!properties) throw new Error( 'The provided action is not registered!' );
        let oldValue = properties[propName];
        properties[propName] = propValue;
        return oldValue;
    }
};

export default ActionsStore;