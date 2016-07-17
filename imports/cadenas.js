import { DefaultCadenas } from 'meteor/svein:serrurier'
import { roles, isLoggedUserInRolesAndChecked } from './security'
import { Meteor } from 'meteor/meteor'
import { Match } from 'meteor/check'
import { getConfig } from 'api/Config'
import getp from 'lodash/get'

// noinspection JSCheckFunctionSignatures

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

const configOptionEnabled = new DefaultCadenas({
  name: 'configOptionEnabled',
  doesAssertionFails (accessor) {
    const config = getConfig()
    if (!isLoggedUserInRolesAndChecked(roles.ADMIN) && !getp(config, accessor)) return 'not.allowed.by.conf.' + accessor
    else return false
  },
  matchPatterns: [ String ]
})

export {
  loggedUserIsAdmin,
  argUserNotSelf,
  configOptionEnabled
}
