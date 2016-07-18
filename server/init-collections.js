import Config from '../imports/api/Config'
import Logger from '../imports/Logger'
import { Meteor } from 'meteor/meteor'

const logger = new Logger('initialize')
// create an admin if none exists.
// TODO implement

Meteor.startup(() => {
  if (!Config.findOne()) {
    const conf = new Config()
    conf.save()
    logger.info('Default config file inserted!')
  }
})
