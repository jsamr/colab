import Config from '/imports/api/Config'
import Project from '/imports/api/Project'
import { roles } from '/imports/security'
import '/imports/api/Annotation'
import '/imports/api/Caption'
import '/imports/api/Exp'
import '/imports/api/Task'
import '/imports/api/User'
import Logger from '/imports/Logger'
import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'

const logger = new Logger('initialize')

Project.extend({
  methods: {
    isUserMember (userId) {
      return this.isUserInRoles(userId, roles.project$MEMBER)
    },
    isUserInRoles (userId, role) {
      return !!userId && Roles.userIsInRole(userId, role, this.getPartition())
    }
  }
})

// create an admin if none exists.
// TODO implement

Meteor.startup(() => {
  if (!Config.findOne()) {
    const conf = new Config()
    conf.save()
    logger.info('Default config file inserted!')
  }
})
