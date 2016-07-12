import { HTTP } from 'meteor/http';
import { asyncGet } from './async';
import isString from 'lodash/isString';
import errors from './server-errors';

class Session {

    hasSpots() {

    }

    /**
     * @return {Promise} Accepted value is a list of spots, rejected value is a string describing the error.
     */
    requirePlaces() {
        return new Promise( function( accept, reject ) {
            asyncGet( 'url' )
                .then( ( result ) => {
                    const data = result.data;
                    if( isString( data ) ) {
                        this.error = errors[data] || errors.UNKNOWN_ERR;
                        reject( this.error );
                    } else {
                        accept( data.places );
                    }
                })
                .catch( ( error ) => {
                    if(error.response && error.response.data) {
                        this.error = errors[error.response.data] || errors.UNKNOWN_ERR;
                    } else {
                        this.error = errors.SERVER_OFFLINE;
                    }
                    reject( this.error );
                })
        });

    }

    /**
     *
     * @param {Exp} exp
     */
    constructor( exp ){
        this.exp = exp;
    }
}

export default Session;