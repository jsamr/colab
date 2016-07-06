/**
 * @module security
 */
import { Meteor } from 'meteor/meteor';
import getp from 'lodash/get';
import { Roles } from 'meteor/alanning:roles';
import { Class, Event } from 'meteor/jagi:astronomy';
import { Match } from 'meteor/check';
import ensures from '../ensures';
import SecurityException from '../SecurityException';

/**
 * @desc Throws an error. If a callback has been provided, send it the error.
 * Must be bound to 'this' for callback to keep 'this' context
 * @paral {!object} errorDescriptor
 * @param {!string} errorDescriptor.reason - An information about the forbidden access.
 * @param {!string} errorDescriptor.errorId - A unique identifier for this error
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
            console.info('CALLING CALLBACK YO');
            callbackCandidate.call(this, error, null);
        }
    }
}


