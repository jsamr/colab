import Logger from '../imports/Logger';
import create from 'lodash/create';
import _ from 'lodash/lodash';
import SecurityReport from './SecurityReport';
import { SecurityException, Serrurier } from 'meteor/svein:serrurier';


Serrurier.publishServerReporter( SecurityException, function ( context ) {
    context.userId = Meteor.userId();
    const report = new SecurityReport( context, this.connection );
    this.unblock();
    report.deliver();
});
