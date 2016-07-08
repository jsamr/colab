import {
    SecurityReport,
    config,
    ParanoidReports
} from './SecurityReport';
import { SecurityException, Serrurier } from 'meteor/svein:serrurier';


Serrurier.publishServerReporter( SecurityException, function ( context ) {
    context.userId = this.userId;
    const report = new SecurityReport( context, this.connection );
    this.unblock();
    report.deliver();
});

export {
    SecurityReport,
    config,
    ParanoidReports
};