import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import { propagateException  } from 'meteor/svein:serrurier/lib/api/security'
import { ensuresArg } from 'meteor/svein:serrurier-core'
import getp from 'lodash/get'

/**
 *
 * @return {boolean} true if logged user is verified, or verify email policy is disabled
 */
function checkAgainstVerifiedEmailPolicy () {
  // noinspection JSUnresolvedVariable
  return !Meteor.settings.public.enableVerifyEmailSecurityPolicy ||
    getp(Meteor.user(), 'emails[0].verified') === true
}

/**
 * @throws {Error} If environment is not server.
 */
export function assertOnServer () {
  if (!Meteor.isServer) propagateException({ reason: 'not.client.side', exceptionId: 'assertOnServer' })
}

/**
 * @desc Check if current logged user is in role(s) and if run on server and email policy enabled
 * if user has email checked.
 * @param {user_role_s} roles - the role(s) to check
 * @param {string=} partition
 * @return {boolean} - true if user is logged in and is in role, false otherwise
 * @see Roles.userIsInRole
 * @see assertLoggedUserInRoles
 */
function isLoggedUserInRolesAndChecked (roles, partition) {
  if (!Meteor.userId()) return false
  else if (!checkAgainstVerifiedEmailPolicy()) return false
  else return isUserInRoles(Meteor.userId(), roles, partition)
}

// noinspection JSUnresolvedVariable
/**
 * @desc Check if current logged in user is in role and throw an errloggedUserInRoleor if he's not
 * @param {user_role_s} roles - the role(s) to check
 * @param {?string} partition
 * @see isLoggedUserInRolesAndChecked
 */
function assertLoggedUserInRoles (roles, partition = Roles.GLOBAL_PARTITION) {
  // TODO manage role_s and partition at secureMethod level
  if (!isLoggedUserInRolesAndChecked(roles, partition)) {
    propagateException({ reason: 'not.checked.nor.in.roles', exceptionId: 'assert-logged-user-in-role' })
  }
}

/**
 *
 * @desc Assert if user exists. Must be run on server.
 * @param {!string} userId - The user identifier
 * @throws {Error} If the user does not exists
 * @throws {Error} If not run on server
 */
function assertUserExists (userId) {
  assertOnServer()
  const found = Meteor.users.findOne(userId, {_id: 1})
  if (!found) propagateException({ reason: 'User does not exists.', exceptionId: 'assert:user-does-not-exists' })
}

/**
 * @desc Check if user is in role(s)
 * @param {!string} userId - the MongoDB user id to check against
 * @param {user_role_s} roles - the role(s) to check user against
 * @return {boolean} - true if user has role in this project scope, false otherwise
 * @param {role_partition} partition - the partition to check roles against
 */
function isUserInRoles (userId, roles, partition) {
  ensuresArg('In `isUserInRoles`, argument `userId`', userId, String)
  return Roles.userIsInRole(userId, roles, partition)
}

/**
 * @desc Set role(s) to give user in given partition.
 * Remind that this is not an additive operation, previous roles will be erased.
 * @server (server side only)
 * @param {!string} userId
 * @param {user_role_s} roles
 * @param {role_partition} partition
 * @see Roles.setUserRoles
 */
function setUserRoles (userId, roles, partition) {
  // TODO check role_s and partition in context
  assertOnServer()
  ensuresArg('In `setUserRoles`, argument `userId`', userId, String)
  ensuresArg('In `setUserRoles`, argument `partition`', partition, String)
  Roles.setUserRoles(userId, roles)
}

/**
 * Clear role(s) to logged user in give partition.
 * Partition cannot be null.
 * @param {role_partition} partition, cannot be Roles.GLOBAL_PARTITION !
 * @see Roles.setUserRoles
 */
function revokeLoggedUserRoles (partition) {
  ensuresArg('In `revokeLoggedUserRoles`, argument `partition`', partition, String)
  Roles.setUserRoles(Meteor.userId(), [], partition)
}

/**
 *
 * @desc
 * An object which properties are {@link user_role_s}
 * UPPERCASE = role
 * LOWERCASE = permission and namespacing
 */
export const roles = Object.freeze({
  ADMIN: 'ADMIN',
  project$MEMBER: 'project.MEMBER',
  project$MANAGER: 'project.MANAGER',
  project$update: 'project.update',
  project$acceptMember: 'project.accept-member',
  project$editUserRole: 'project.edit-user-role',
  project$addAndRemoveTaskSegment: 'project.add&remove-task-segment',
  project$editTaskSegment: 'project.edit-task-segment',
  project$editAnnotation: 'project.edit-annotation',
  project$addAndRemoveAnnotation: 'project.add&remove-annotation',
  project$editTaskType: 'project.edit-task-type',
  project$editAnnotationType: 'project.edit-annotation-category',
  project$publishExp: 'project.pre-validate-exp',
  project$syncVideo: 'project.sync-videos',
  project$createExp: 'project.create-exp',
  project$deleteExp: 'project.delete-exp',
  project$updateExp: 'project.update-exp'
})

export {
  propagateException,
  roles,
  assertLoggedUserInRoles,
  assertOnServer,
  isLoggedUserInRolesAndChecked,
  isUserInRoles,
  revokeLoggedUserRoles,
  setUserRoles,
  assertUserExists
}
