import '../imports/cadenas'
import '../imports/init-behaviors'
import { Meteor } from 'meteor/meteor'
import '../imports/unsecure-login-mock'
import './init-collections'
import './init-security-tracker'
import './init-roles'
import './init-publications'
import { config } from 'meteor/svein:serrurier-reporter-paranoid'

config({
  geotracking: true
})

Meteor.startup(() => {
  // code to run on server at startup
})
