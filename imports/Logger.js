import { createNamespacedLoggerClass } from 'meteor/svein:serrurier-decorators-core/lib/utils';

const Logger = createNamespacedLoggerClass( 'colab:' );
Logger.setLevel('debug');
export default Logger;