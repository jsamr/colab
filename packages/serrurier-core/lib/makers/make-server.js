import { ActionsStore } from '../core';
import Logger from '../Logger';

const logger = new Logger('maker:onServer');

/**
 *
 * @param {!string} methodName
 * @return {Function}
 */
function remoteCaller( methodName, actionDescriptor ){
    logger.debug( 'Defining', actionDescriptor );
    return function(){
        const self = Array.prototype.shift.call( arguments );
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
            const namespacedName = '/serrurier/methods/' + actionDescriptor;
            if(Meteor.isServer) {
                Meteor.methods({ [namespacedName] : remoteCaller( methodName, actionDescriptor ) });
            }
            wrappedMethod = function() {
                if ( Meteor.isServer )  return old.apply(this, arguments);
                // notice that it applies callback
                else return Meteor.call( namespacedName, this, ...arguments );
            };
            ActionsStore.setProp( old, 'wrappedOnServer', true );

        } else logger.warn( `method \`${actionDescriptor}\` is already decorated with 'onServer'` );
    }
    return wrappedMethod;
}