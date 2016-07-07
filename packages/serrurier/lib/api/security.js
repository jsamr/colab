import { Match } from 'meteor/check';
import SecurityException from '../SecurityException';

/**
 * Throws a SecurityException. If a callback has been provided, send it the error.
 * Must be bound to 'this' for callback to keep 'this' context
 * @paral {!object} errorDescriptor
 * @param {!string} errorDescriptor.reason - An information about the forbidden access.
 * @param {!string} errorDescriptor.exceptionId - A unique identifier for this error
 * @param {?Function_meteor_callback=} callbackCandidate - ignored if not a function
 * @throws {SecurityException} Always.
 */
export function propagateSecurityException( errorDescriptor, callbackCandidate=null ) {
    let context = {};
    const error = new SecurityException( context );
    Object.assign( context, errorDescriptor );
    try {
        throw error;
    } finally {
        if ( Match.test( callbackCandidate, Function ) ) {
            callbackCandidate.call( this, error, null );
        }
    }
}


