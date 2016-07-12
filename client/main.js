import 'meteor/svein:serrurier-reporter-paranoid';
import '../imports/assertions';
import '../imports/init-behaviors';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../imports/validation';
import { Meteor } from 'meteor/meteor';
import '../imports/unsecure-login-mock';
import './main.html';

import { getConfig }  from '../imports/api/Config';
import Project from '../imports/api/Project';
import { TaskType } from '../imports/api/TaskType';
import { Accounts } from 'meteor/accounts-base';

Accounts.onLogin( function() {
    console.info(arguments)
})

let once=true;

Tracker.autorun(()=>{
  const sub1 = Meteor.subscribe('projects');
  const sub2= Meteor.subscribe('globalconfig');
  if(sub1.ready() && sub2.ready() && once){
    //try {
      once=false;
      let store = require('../imports/store').default;
      console.info(store.getState())
      //const conf=getConfig();
      //conf.unsetUserAdmin(Meteor.userId());
      //conf.remove();
      let prj = new Project();
      prj.updateSensitiveData(function( err, result ){
          console.info(err)
      });
      //let taskType1 = new TaskType();
      //taskType1.name='Yolo';
      //taskType1.color='yahoo';
      //prj.acronym='POIQS';
      //prj.fullName='Pistache Orientée Patrie Object';
      //prj.save();
      //prj.addTaskType(taskType1);
      //prj.save();
      //prj.addTaskType(taskType2, [1]);
      //prj.removeTaskType(taskType2);
      //prj.remove();
      //console.info(prj);
    //} catch(e){
    //  if(e instanceof SecurityError){
    //    e.report();
    //    console.error(e.message);
    //    if(Meteor.isDevelopment) console.error(e.stack);
    //  } else {
    //    throw e;
    //  }
    //}
  }
});

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);

});

Template.hello.onRendered(function(){

});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  }
});

//noinspection JSUnusedLocalSymbols
Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  }
});
