import pince from 'meteor/jag:pince';

const namespace = 'astro-checkpoints';
pince.Logger.setLevel( namespace, 'info' );
let disableLogging = false;
class Logger extends pince.Logger {

    /**
     * Disable once and for all the logging of astro-decorators
     */
    static silence() {
        disableLogging = true;
    }

    /**
     *
     * @param {!string} level One among 'trace, debug, info, warn, error'
     */
    static setLevel( module, level ) {
        if(level) pince.Logger.setLevel( `${namespace}:${module}`, level );
        else pince.Logger.setLevel( namespace, level );
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

    constructor( actor ){
        super( `${namespace}:${actor}` )
    }
}
//Logger.setFormat('%L %N %M');
export default Logger;