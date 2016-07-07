import ActionsStore from '../ActionsStore';
import Logger from '../Logger';

const logger = new Logger('maker:onServer');

/**
 *
 * @param {action_descriptor} actionDescriptor
 * @param {!string} methodName
 * @return {Function}
 */
function remoteCaller(actionDescriptor, methodName){
    logger.debug('Defining', actionDescriptor);
    return function(){
        const self=Array.prototype.shift.call(arguments);
        return self[methodName](...arguments);
    }
}

/**
 * @param {Function} old
 * @param {action_descriptor} actionDescriptor
 * @param {!string} methodName
 * @return {Function}
 */
export function makeOnServer( old, actionDescriptor, methodName ) {
    let wrappedMethod = old;
    if(ActionsStore.getProp( old, 'onServer' )) {
        //noinspection JSUnresolvedVariable
        if(!ActionsStore.getProp( old, 'wrappedOnServer' )){
            logger.debug( 'Wrapping method with `onServer` decorator', actionDescriptor );
            if(Meteor.isServer) {
                // define method
                const method = {};
                method[actionDescriptor] = remoteCaller( actionDescriptor, methodName );
                Meteor.methods( method );
            }
            wrappedMethod = function() {
                if ( Meteor.isServer ) {
                    return old.apply(this, arguments);
                } else {
                    // notice that it applies callback
                    return Meteor.call( actionDescriptor, this, ...arguments );
                }
            };
            ActionsStore.setProp( old, 'wrappedOnServer', true );

        } else logger.warn( `method \`${actionDescriptor}\` is already decorated with 'onServer'` );
    }
    return wrappedMethod;
}