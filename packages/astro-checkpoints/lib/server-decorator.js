import {
    ActionsStore,
    Logger
} from 'meteor/svein:astro-decorators-core';
import Meteor from 'meteor/meteor';


/**
 * Decoration to mark this method as to be executed on server.
 * @return {Function}
 */
export default function server(){
    return function( target, methodName ){
        ActionsStore.registerOrUpdate( target[methodName], ActionsStore.getDescriptorFromContext( methodName ) );
        ActionsStore.setProp( target[methodName], 'onServer', true );
        return target[methodName];
    }
}