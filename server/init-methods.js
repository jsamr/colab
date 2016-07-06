import Logger from '../imports/Logger';
import create from 'lodash/create';
import _ from 'lodash/lodash';
import SecurityReport from './SecurityReport';


Meteor.methods({
    /**
     * @param {!security_context} context
     */
    'security.reportSuspectActivity'(context){
        context.userId = Meteor.userId();
        const report =new SecurityReport(context, this.connection);
        this.unblock();
        report.deliver();
    }
});