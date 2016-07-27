import { Serrurier } from 'meteor/svein:serrurier'
import { Roles } from 'meteor/alanning:roles'
import { roles } from '/imports/security'
import _ from 'lodash'
import getp from 'lodash/get'
import includes from 'lodash/includes'
import Project from './Project'
import { Meteor } from 'meteor/meteor'
import { propagateException } from 'meteor/svein:serrurier/lib/api/security'

function getUserProjectsId (user, userRole = roles.project$MEMBER) {
  return _(Roles.getRolesForUser(user._id, { fullObjects: true, anyPartition: true }))
    .filter(role => role._id === userRole)
    .map(function (role) {
      let { partition } = role
      if (partition) return partition.replace('projects.', '')
      else return partition
    })
    .value()
}

const minLen1 = {
  type: 'minLength',
  param: 1
}

const UserProfile = Serrurier.createClass({
  name: 'UserProfile',
  fields: {
    firstname: {
      type: String,
      validators: [minLen1]
    },
    lastname: {
      type: String,
      validators: [minLen1]
    }
  },
  events: {
    beforeUpdate (e) {
      if (Meteor.userId() !== e.target._id) propagateException({ reason: 'Cannot update someone else profile.', exceptionId: 'cannot.update.other.profile' })
    }
  }
})

const SimpleUser = Serrurier.createClass({
  name: 'SimpleUser',
  collection: Meteor.users,
  fields: {
    emails: [ Object ],
    username: {
      type: String,
      validators: [{
        type: 'minLength',
        param: 4
      }]
    },
    profile: {
      type: UserProfile
    }
  },
  methods: {

    isVerified () {
      return getp(this, 'emails[0].verified')
    },

    getFirstAddress () {
      return getp(this, 'emails[0].address')
    },

    hisManagedProjects () {
      const projectIds = getUserProjectsId(this, roles.project$MANAGER)
      const selector = includes(projectIds, null) ? {} : { _id: { $in: projectIds } }
      return Project.find(selector).fetch()
    },

    hisProjects () {
      const projectIds = getUserProjectsId(this)
      const selector = includes(projectIds, null) ? {} : { _id: { $in: projectIds } }
      return Project.find(selector).fetch()
    },

    notHisProjects () {
      const projectIds = getUserProjectsId(this)
      if (includes(projectIds, null)) return []
      else return Project.find({ _id: { $nin: projectIds } })
    }
  }
})

const CurrentUser = SimpleUser.inherit({
  name: 'CurrentUser',
  fields: {
    roles: {
      type: [ Object ],
      default: []
    },
    services: Object
  }
})

export {
  SimpleUser,
  CurrentUser
}
