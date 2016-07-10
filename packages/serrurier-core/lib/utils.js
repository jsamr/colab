function decoratorMock( target, propName, decoration ) {
    decoration( target, propName );
}
import pince from 'meteor/jag:pince';


const createNamespacedLoggerClass = function( namespace ) {
    let disableLogging = false;

    class Logger extends pince.Logger {

        /**
         * Disable once and for all the logging of this type
         */
        static silence() {
            disableLogging = true;
        }

        /**
         *
         * @param {!string} level One among 'trace, debug, info, warn, error'
         */
        static setLevel( level ) {
            pince.Logger.setLevel( namespace, level );
        }
        static setModuleLevel( module, level ){
            pince.Logger.setLevel( `${namespace}:${module}`, level );
        }
        debug(){
            if(!disableLogging) super.debug( ...arguments );
        }

        trace(){
            if(!disableLogging) super.trace( ...arguments );
        }

        info() {
            if(!disableLogging) super.info( ...arguments );
        }

        warn(){
            if(!disableLogging) super.warn( ...arguments );
        }

        error(){
            if(!disableLogging) super.error( ...arguments );
        }
        constructor( module ){
            super( `${namespace}:${module}` )
        }
    }
    Logger.setLevel( 'info' );
    return Logger;
};

function once(fn) {
    var returnValue, called = false;
    return function () {
        if (!called) {
            called = true;
            returnValue = fn.apply(this, arguments);
        }
        return returnValue;
    };
}

export {
    decoratorMock,
    createNamespacedLoggerClass,
    once
}