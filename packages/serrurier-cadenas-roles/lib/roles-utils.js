import { Roles } from 'meteor/alanning:roles';
/**
 * Check if current logged user is in role(s)
 * @param {user_role_s} role_s - the role(s) to check
 * @param {string=} partition
 * @return {boolean} - true if user is in role, false otherwise
 * @see Roles.userIsInRole
 * @see assertLoggedUserInRole_s
 */
export function isLoggedUserInRole_s( role_s, partition ) {
    return isUserInRole_s( Meteor.userId(), role_s, partition );
}

/**
 * @desc Check if user is in role(s)
 * @param {!string} userId - the MongoDB user id to check against
 * @param {user_role_s} role_s - the role(s) to check user against
 * @return {boolean} - true if user has role in this project scope, false otherwise
 * @param {role_partition} partition - the partition to check roles against
 */
export function isUserInRole_s( userId, role_s, partition ) {
    return Roles.userIsInRole( userId, role_s, { partition } ) ;
}