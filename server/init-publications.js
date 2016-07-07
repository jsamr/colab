import getp from 'lodash/get';
import extend from 'lodash/extend';
import Config, { SINGLETON_CONFIG_ID } from '../imports/api/Config';
import Project from '../imports/api/Project';
import Exp from '../imports/api/Exp';
import { ensures } from 'meteor/svein:serrurier-decorators-core';
import { roles } from '../imports/security';
import { Meteor } from 'meteor/meteor';
// import plugins
import Annotation from '../imports/api/Annotation';
import Task from '../imports/api/Task';
import Caption from '../imports/api/Caption';

const onlyId = {
    fields:{
        _id:true
    }
};

const expRetrievalConstrains =  function(projectId){
    let project=Project.findOne(projectId, {fields:{publicationPolicy:true}} );
    if (project && (!project.publicationPolicy || project.isUserInRole_s(this.userId, roles.project$publishExp))) {
        return {};
    } else {
        return { published:true };
    }
};

Meteor.publish('globalconfig', function(){
    const userIsAdmin=Roles.userIsInRole(this.userId, roles.ADMIN);
    // forbid any non-admin members to view whitelist
    let modifier=userIsAdmin?{}:{
        fields:{
            whitelist:0
        }
    };
    return Config.find(SINGLETON_CONFIG_ID, modifier);
});

Meteor.publish('projects', () => Project.find({}));
Meteor.publish('project.by-acronym', function(acr){
    ensures('Publishing project-by-acronym', acr, String);
    return Project.find({ acronym:acr });
});
Meteor.publish('project.by-id', function(id){
    ensures('Publishing project.by-id', id, String);
    return Project.find(id);
});



Meteor.publish('experiments.by-id', function(projectId) {
    ensures('Publishing experiments.by-id', projectId, String);
    return Exp.find(extend({projectId}, expRetrievalConstrains.call(this, projectId)));
});
Meteor.publish('experiments.by-acronym', function(projectAcr) {
    ensures('Publishing experiments.by-acronym', projectAcr, String);
    let project = Project.findOne( { acronym:projectAcr }, onlyId);
    let constrains=expRetrievalConstrains.call(this, getp(project,'_id'));
    return Exp.find(extend({projectId: getp(project, '_id')}, constrains));
});
Meteor.publish('experiments.by-name', expName => {
    ensures('Publishing experiments.by-name', expName, String);
    return Exp.find({name: expName});
});

Meteor.publish('plugins.tasks', expName => {
    ensures('Publishing plugins.tasks', expName, String);
    const exp=Exp.findOne({ name:expName }, onlyId);
    return Task.find({ expId: getp(exp,'_id') });
});
Meteor.publish('plugins.captions', function(expName) {
    ensures('Publishing plugins-captions', expName, String);
    const exp=(Exp.findOne({ name:expName }, onlyId));
    return Caption.find({expId:getp(exp,'_id')});
});
Meteor.publish('plugins.annotations', function(expName) {
    ensures('Publishing plugins-annotations', expName, String);
    const exp=(Exp.findOne({ name:expName }, onlyId));
    return Annotation.find({expId:getp(exp,'_id')});
});

Meteor.publish('users', () => Meteor.users.find());

Meteor.publish('roles', () => Meteor.roles.find());