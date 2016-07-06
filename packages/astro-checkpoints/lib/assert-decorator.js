import ensures from './ensures';
import { propagateSecurityException } from './api/security';
import { buildAssertion } from './api/Assertor';
import { Match } from 'meteor/check';
import last from 'lodash/last'
/**
 * @param name
 * @param {...*} params - params to give to the named assertor
 * @example
 * ​@asserting( 'loggedUserInRole', roles.ADMIN )
 * methodThatMustBeRunByAdmin(){
 *           // method content
 * }
 *
 */
export default function assert( name, ...params ){
    let thatMethodName = '';
    let assertion = buildAssertion( () => thatMethodName, name, params );
    return function( target, methodName ) {
        const old = target[methodName];
        thatMethodName = methodName;
        ensures( 'The annotation `asserting` must be applied to a function', old, Function );
        target[methodName] = function() {
            /** @type error_descriptor|null */
            let errorDescriptor = assertion.perform( this, arguments );
            // if at least one assertion returns an error descriptor, store it and stop proceeding assertions.
            if( Match.test( errorDescriptor, Object ) ) {
                const possibleCallback = last( arguments );
                propagateSecurityException.call( this, errorDescriptor, possibleCallback );
            }
            else return old.apply( this, arguments );
        };
        return target[methodName];
    }
}