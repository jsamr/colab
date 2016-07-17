import { Behavior } from 'meteor/jagi:astronomy'
import { assertLoggedUserInRoles, setUserRoles, revokeLoggedUserRoles, isUserInRoles } from './security'
import { Meteor } from 'meteor/meteor'

const definition = {
  methods: {
    /**
     * @function
     * @name PartitionClass#getPartition
     * @return {role_partition}
     *
     */
    getPartition () {
      return `${this.constructor.getName().toLowerCase()}s.${this._id}`
    },
    /**
     * Check if current logged in user is in role for this project' scope and throw an error if he's not
     * @param {!string|!string[]} roles - The role(s) to check
     * @param {?mongodb_string_id=} userToCheck - Optionally, check that this user id is not equal to logged user id before proceeding assertion.
     * @throws { Error } When the caller has no prerogatives to perform this operation.
     */
    assertLoggedUserInRoles (roles, userToCheck = null) {
      if (userToCheck === null || userToCheck !== Meteor.userId()) {
        assertLoggedUserInRoles(roles, this.getPartition())
      }
    },
    /**
     * Check if user has access to role(s) in this project scope (partition)
     * @param {string} userId - the MongoDB user id to check against
     * @param {string | string[]} roles - the role(s) to check user against
     * @return {boolean} - true if user has role in this project scope, false otherwise
     */
    isUserInRoles (userId, roles) {
      return isUserInRoles(userId, roles, this.getPartition())
    }
  }
}

if (Meteor.isServer) {
  /**
   * Set user role(s) for the scope of this project.
   * @server (server side only)
   * @param {string} userId - The id associated with the user to change role.
   * @param {!string|!string[]} roles - The role(s) to set
   * @throws { Error } When the caller has no prerogatives to perform this operation.
   */
  definition.methods.setUserRoles = function (userId, roles) {
    setUserRoles(userId, roles, this.getPartition())
  }
  definition.methods.revokeLoggedUserRoles = function () {
    revokeLoggedUserRoles(this.getPartition())
  }
}

const partitionRoot = {
  name: 'partitionRoot',
  options: {},
  createClassDefinition () {
    return definition
  },
  apply (Class) {
    Class.extend(this.createClassDefinition(), ['methods'])
  }
}

Behavior.create(partitionRoot)
