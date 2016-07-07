import { createNamespacedLoggerClass }  from 'meteor/svein:serrurier-decorators-core/lib/utils';
let namespace = 'serrurier:';
if(Meteor.isClient) namespace = '\uD83D\uDD12 ';
const Logger = createNamespacedLoggerClass( namespace );
export default Logger;