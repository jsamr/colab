import { DefaultCadenas } from 'meteor/svein:serrurier'
import { roles } from './security'
import { Meteor } from 'meteor/meteor'
import { Match } from 'meteor/check'
import getp from 'lodash/get'
// noinspection JSCheckFunctionSignatures

/**
 *
 * @return {boolean} true if logged user is verified, or verify email policy is disabled
 */
function checkAgainstVerifiedEmailPolicy () {
  return !Meteor.settings.public.enableVerifyEmailSecurityPolicy ||
    getp(Meteor.user(), 'emails[0].verified') === true
}

/**
 * Assert the logged user is admin
 */
const loggedUserIsAdmin = DefaultCadenas.partialFrom('loggedUserInRole', {
  name: 'loggedUserIsAdmin',
  reason: 'Must be admin.'
}, roles.ADMIN)

const argUserNotSelf = DefaultCadenas.partialFrom('matchParams', {
  name: 'argUserNotSelf',
  reason: 'Cannot apply to self!'

}, [ Match.Where((userId) => Meteor.userId() !== userId) ])

export {
  checkAgainstVerifiedEmailPolicy,
  loggedUserIsAdmin,
  argUserNotSelf
}
