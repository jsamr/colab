/**
 * @module security
 */
import { Meteor } from 'meteor/meteor';
import getp from 'lodash/get';
import assign from 'lodash/assign';
import isFunction from 'lodash/isFunction';
import { Roles } from 'meteor/alanning:roles';
import { Class, Event } from 'meteor/jagi:astronomy';
import { ensures } from 'meteor/svein:serrurier-core';
import Logger from './Logger';

/**
 * @desc serialize any Astro.Class instance
 * @param {!AstroClass} target
 * @return {object} A serializable target
 */
export function makeTargetSerializable(target){
    const className=target.constructor.getName(),
        serial={};
    serial[className]=target.raw();
    return serial;
}

/**
 *
 * @param {Astro.Event} e - an event from Astronomy events.
 * @param {AstroClass} e.target - the target of the event
 * @param {AstroClass} e.currentTarget - the current target of the event
 * @return {security_context}
 */
export function eventToContext(e){
    ensures('security.eventToContext', e, Event);
    const context = {
        target:makeTargetSerializable(e.target)
    };
    if(e.currentTarget !== e.target){
        context.currentTarget=makeTargetSerializable(e.currentTarget);
    }
    return context;
}

/**
 * @desc Throws an error. If a callback has been provided, send it the error.
 * Must be bound to 'this' for callback to keep 'this' context
 * @paral {!object} errorDescriptor
 * @param {!string} errorDescriptor.reason - An information about the forbidden access.
 * @param {!string} errorDescriptor.exceptionId - A unique identifier for this error
 * @param {?Function_meteor_callback=} callbackCandidate - ignored if not a function
 * @throws {SecurityException} Always.
 */
export function propagateSecurityException(errorDescriptor, callbackCandidate=null ) {
    let context = {};
    const error = new SecurityException( context );
    assign(context, errorDescriptor);
    try {
        throw error;
    } finally {
        if (_.isFunction(callbackCandidate)){
            console.info('CALLING CALLBACK YO');
            callbackCandidate.call(this, error, null);
        }
    }
}

/**
 * @throws {Error} If environment is not server.
 */
export function assertOnServer(){
    if(!Meteor.isServer) propagateSecurityException('Cannot be run client side.', 'assert-on-server');
}

/**
 * @desc Performs a set of security checks. If an asyncCallback is provided,
 * call this callback with an error as a first parameter and the result of securityChecks as second argument.
 * Otherwise, call securityChecks.
 * @param {!Function} securityChecks
 * @param {?Function} asyncCallback - function(error, result){ ... }
 * @throws {Error} Any error triggered by securityChecks when asyncCallback has not been provided.
 * @throws {Error} if securityChecks is not a function
 * @return {Boolean} true if an error has been encountered, false otherwise.
 */
export function performSecurityChecks(securityChecks, asyncCallback=null){
    check(securityChecks, Function);
    if(isFunction(asyncCallback)){
        try {
            const result=securityChecks.call(null);
            asyncCallback.call(null, null, result);
            return false;
        } catch(error){
            asyncCallback.call(null, error, null);
            return true;
        }
    } else {
        securityChecks.call(null);
        return false;
    }
}

/**
 * @desc Check if current logged user is in role(s) and if run on server and email policy enabled
 * if user has email checked.
 * @param {user_role_s} role_s - the role(s) to check
 * @param {string=} partition
 * @return {boolean} - true if user is logged in and is in role, false otherwise
 * @see Roles.userIsInRole
 * @see assertLoggedUserInRole_s
 */
export function isLoggedUserInRole_s(role_s, partition){
    if(!Meteor.userId()) return false;
    else if(!checkAgainstVerifiedEmailPolicy()) return false;
    else return isUserInRole_s(Meteor.userId(), role_s, partition);
}

/**
 * @desc Check if current logged in user is in role and throw an errloggedUserInRoleor if he's not
 * @param {user_role_s} role_s - the role(s) to check
 * @param {?string} partition
 * @see isLoggedUserInRole_s
 */
export function assertLoggedUserInRole_s(role_s, partition=Roles.GLOBAL_PARTITION){
    //TODO manage role_s and partition at secureMethod level
    if(!isLoggedUserInRole_s(role_s, partition)) {
        propagateSecurityException( { reason: 'Missing required prerogatives.', exceptionId:'assert-logged-user-in-role' } );
    }
}

/**
 *
 * @desc Assert if user exists. Must be run on server.
 * @param {!string} userId - The user identifier
 * @throws {Error} If the user does not exists
 * @throws {Error} If not run on server
 */
export function assertUserExists(userId){
    assertOnServer();
    const found=Meteor.users.findOne( userId, {_id:1} );
    if(!found) propagateSecurityException( { reason: 'User does not exists.', exceptionId: 'assert:user-does-not-exists' } );
}

/**
 * @desc Check if user is in role(s)
 * @param {!string} userId - the MongoDB user id to check against
 * @param {user_role_s} role_s - the role(s) to check user against
 * @return {boolean} - true if user has role in this project scope, false otherwise
 * @param {role_partition} partition - the partition to check roles against
 */
export function isUserInRole_s(userId, role_s, partition){
    check(userId, String);
    return Roles.userIsInRole(userId, role_s, { partition });
}

/**
 * @desc Set role(s) to give user in given partition.
 * Remind that this is not an additive operation, previous roles will be erased.
 * @server (server side only)
 * @param {!string} userId
 * @param {user_role_s} role_s
 * @param {role_partition} partition
 * @see Roles.setUserRoles
 */
export function setUserRole_s(userId, role_s, partition){
    //TODO check role_s and partition in context
    assertOnServer();
    check(userId, String);
    check(partition, String);
    Roles.setUserRoles(userId, role_s);
}

/**
 * Clear role(s) to logged user in give partition.
 * Partition cannot be null.
 * @param {role_partition} partition, cannot be Roles.GLOBAL_PARTITION !
 * @see Roles.setUserRoles
 */
export function revokeLoggedUserRole_s(partition){
    check(partition, String);
    Roles.setUserRoles(Meteor.userId(), [], partition);
}


/**
 *
 * @desc
 * An object which properties are {@link user_role_s}
 * UPPERCASE = role
 * LOWERCASE = permission and namespacing
 */
export const roles = Object.freeze({
    ADMIN:'ADMIN',
    project$MEMBER:'project.MEMBER',
    project$MANAGER:'project.MANAGER',
    project$update:'project.update',
    project$acceptMember:'project.accept-member',
    project$editUserRole:'project.edit-user-role',
    project$addAndRemoveTaskSegment:'project.add&remove-task-segment',
    project$editTaskSegment:'project.edit-task-segment',
    project$editAnnotation:'project.edit-annotation',
    project$addAndRemoveAnnotation:'project.add&remove-annotation',
    project$editTaskType:'project.edit-task-type',
    project$editAnnotationType:'project.edit-annotation-category',
    project$publishExp:'project.pre-validate-exp',
    project$syncVideo:'project.sync-videos',
    project$createExp:'project.create-exp',
    project$deleteExp:'project.delete-exp',
    project$updateExp:'project.update-exp'
});

