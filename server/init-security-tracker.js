import getp from 'lodash/get';
import Logger from '../imports/Logger';
import { ensures } from 'meteor/svein:serrurier-decorators-core';
const logger=new Logger('security-tracker:emails');
import { Roles } from 'meteor/alanning:roles';

const DOMAIN_PATH='settings.email.domain',
      EMAIL_ENABLED_PATH='settings.email.enabled';

if(getp(Meteor, EMAIL_ENABLED_PATH)){
    const domain=getp(Meteor,DOMAIN_PATH);
    ensures(`Domain is not defined, the required path is ${DOMAIN_PATH}`, domain, String);
    logger.info('enabled');
} else {
    logger.info('disabled');
}