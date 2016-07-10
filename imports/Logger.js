import { createNamespacedLoggerClass } from 'meteor/svein:serrurier-core/lib/utils';

const Logger = createNamespacedLoggerClass( 'colab' );
Logger.setLevel('debug');
export default Logger;