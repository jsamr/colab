import { DefaultCadenas } from 'meteor/svein:serrurier'
import { isLoggedUserInRolesAndChecked, roles } from './security'
import getp from 'lodash/get'
import { getConfig } from './api/Config'

const configOptionEnabled = new DefaultCadenas({
  name: 'configOptionEnabled',
  doesAssertionFails (accessor) {
    const config = getConfig()
    if (!isLoggedUserInRolesAndChecked(roles.ADMIN) && !getp(config, accessor)) return 'not.allowed.by.conf.' + accessor
    else return false
  },
  matchPatterns: [ String ]
})

export default configOptionEnabled
