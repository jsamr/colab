import getp from 'lodash/get'
import extend from 'lodash/extend'
import Config, { SINGLETON_CONFIG_ID } from '../imports/api/Config'
import Project from '../imports/api/Project'
import Exp from '../imports/api/Exp'
import { ensures, ensuresArg } from 'meteor/svein:serrurier-core/lib/ensures'
import { roles } from '../imports/security'
import { Meteor } from 'meteor/meteor'
// import plugins
import Annotation from '../imports/api/Annotation'
import Task from '../imports/api/Task'
import Caption from '../imports/api/Caption'
import { Match } from 'meteor/check'
import invoke from 'lodash/invoke'
import { Roles } from 'meteor/alanning:roles'

const onlyId = {
  fields: {
    _id: true
  }
}

const basicPrjFields = {
  _id: 1,
  publicationPolicy: 1
}

const expRetrievalConstrains = function (project) {
  ensures('expRetrievalConstrains, argument `project` must be instance of Project', project, Match.Optional(Project))
  if (project && (!project.publicationPolicy || project.isUserInRoles(this.userId, roles.project$publishExp))) {
    return {}
  } else {
    return { published: true }
  }
}

Meteor.publish('globalconfig', function () {
  const userIsAdmin = Roles.userIsInRole(this.userId, roles.ADMIN)
  // forbid any non-admin members to view whitelist
  let modifier = userIsAdmin ? {} : {
    fields: {
      whitelist: 0
    }
  }
  return Config.find(SINGLETON_CONFIG_ID, modifier)
})

Meteor.publish('projects', function () {
  if (this.userId) return Project.find({})
  else return []
})

Meteor.publish('project.by-acronym', function (acr) {
  ensuresArg('Publishing `project-by-acronym`, argument `acr`', acr, String)
  const prj = Project.findOne({ acronym: acr }, { fields: basicPrjFields })
  if (prj && prj.isUserMember(this.userId)) return Project.find({ acronym: acr })
  else return []
})

Meteor.publish('project.by-id', function (id) {
  ensuresArg('Publishing `project.by-id`, argument `id`', id, String)
  const prj = Project.findOne({ _id: id }, { fields: basicPrjFields })
  if (prj && prj.isUserMember(this.userId)) return Project.find(id)
  else return []
})

Meteor.publish('experiments.by-project-id', function (projectId) {
  ensuresArg('Publishing experiments.by-project-id, argument `projectId`', projectId, String)
  const prj = Project.findOne({ _id: projectId }, { fields: basicPrjFields })
  if (prj && prj.isUserMember(this.userId)) return Exp.find(extend({projectId}, expRetrievalConstrains.call(this, prj)))
  else return []
})

Meteor.publish('experiments.by-acronym', function (projectAcr) {
  ensuresArg('Publishing experiments.by-acronym, argument `projectAcr`', projectAcr, String)
  let prj = Project.findOne({ acronym: projectAcr }, { fields: basicPrjFields })
  if (prj && prj.isUserMember(this.userId)) {
    let constrains = expRetrievalConstrains.call(this, prj)
    return Exp.find(extend({projectId: getp(prj, '_id')}, constrains))
  } else return []
})

Meteor.publish('experiment.by-name', function (expName, projectId) {
  ensuresArg('Publishing experiments.by-name, argument `expName`', expName, String)
  ensuresArg('Publishing experiments.by-name, argument `projectId`', projectId, String)
  const isUserAllowed = invoke(Project.findOne(projectId, { fields: basicPrjFields }), 'isUserMember', this.userId)
  if (isUserAllowed) return Exp.find({name: expName, projectId: projectId})
  else return []
})

Meteor.publish('plugins.tasks', function (expName, projectId) {
  ensuresArg('Publishing `plugins.tasks`, argument `expName`', expName, String)
  ensuresArg('Publishing `plugins.tasks`, argument `projectId`', projectId, String)
  const isUserAllowed = invoke(Project.findOne(projectId, { fields: basicPrjFields }), 'isUserMember', this.userId)
  if (isUserAllowed) {
    const exp = Exp.findOne({ name: expName }, onlyId)
    return Task.find({ expId: getp(exp, '_id') })
  } else return []
})

Meteor.publish('plugins.captions', function (expName, projectId, captionNames) {
  ensuresArg('Publishing `plugins.captions`, argument `expName`', expName, String)
  ensuresArg('Publishing `plugins.captions`, argument `projectId`', projectId, String)
  ensures('Publishing `plugins.captions`, argument `captionNames` must be an array of string', captionNames, [String])
  const isUserAllowed = invoke(Project.findOne(projectId, { fields: basicPrjFields }), 'isUserMember', this.userId)
  if (isUserAllowed) {
    const exp = (Exp.findOne({ name: expName }, onlyId))
    const expId = getp(exp, '_id')
    if (expId) {
      // populate missing captions
      captionNames.forEach((place) => Caption.upsert(
        {
          expId,
          place
        },
        { $setOnInsert: {
          expId,
          offset_rm: null,
          place,
          class: 'tasks'
        }
        }))
    }
    return Caption.find({ expId, place: { $in: captionNames }, class: 'tasks' })
  } else return []
})

Meteor.publish('plugins.annotations', function (expName, projectId) {
  ensuresArg('Publishing `plugins.annotations`, argument `expName`', expName, String)
  ensuresArg('Publishing `plugins.annotations`, argument `projectId`', projectId, String)
  const isUserAllowed = invoke(Project.findOne(projectId, { fields: basicPrjFields }), 'isUserMember', this.userId)
  if (isUserAllowed) {
    const exp = (Exp.findOne({ name: expName }, onlyId))
    return Annotation.find({ expId: getp(exp, '_id') })
  } else return []
})

// TODO : add some ADMIN logic
Meteor.publish('users', () => Meteor.users.find())

// TODO control accesses
Meteor.publish('roles', () => Meteor.roles.find())

/**
 * Publish general user information including basic information about the venues they have access to
 */
Meteor.publish('currentuser', function () {
  return Meteor.users.find({
    _id: this.userId
  }, {
    fields: {
      email: true,
      username: true,
      profile: true,
      roles: true,
      'services.password': true
    }
  })
})
