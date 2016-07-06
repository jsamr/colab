'use strict';
import '../imports/assertions';
import '../imports/init-behaviors';
import { Meteor } from 'meteor/meteor';
import '../imports/unsecure-login-mock';
import './init-collections';
import './init-security-tracker';
import './init-roles';
import './init-publications';
import './init-methods';

Meteor.startup(() => {
  // code to run on server at startup
});
