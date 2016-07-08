import Logger from './Logger';
import getp from 'lodash/get';
import pick from 'lodash/pick';
import isString from 'lodash/isString';
import stringifyObject from 'stringify-object';
import { HTTP } from 'meteor/http';

let geoLogger = new Logger( 'geoinfo' );
const UNKNOWN = "unknown";
const ONE_DAY = 86400;
const ONE_MONTH = ONE_DAY*30;

const ParanoidTrackedIPs = new Meteor.Collection( "paranoid_UTIP" );

let ParanoidReports =  new Meteor.Collection( "paranoid_SASR" );
let isGeoTrackingEnabled = false;

const geoProviderAPI = "https://freegeoip.net/json/";
const geoProviderTimeout = 3000;
const geoProviderFields = [
    'country_name',
    'region_name',
    'city',
    'zip_code',
    'latitude',
    'longitude'
];

class GeoTracker {

    /**
     *
     * @return {Promise}
     */
    getHttpPromise() {
        return new Promise( ( resolve, reject ) => {
            HTTP.get( `${geoProviderAPI}${this.ip}`, { timeout: geoProviderTimeout }, ( error, result ) => {
                if ( error ) reject( error );
                else resolve( result );
            });
        });
    }

    /**
     *
     * @return {Promise} Resolves to geoInfo or null
     */
    fromDB() {
        const geoInfo=ParanoidTrackedIPs.findOne( { _id: this.ip } ) || null;
        return Promise.resolve( geoInfo );
    }

    /**
     * @return {Promise} Resolves to geoInfo or null
     */
    fromService() {
        return this.getHttpPromise().then( (result) => {
            let geoInfo=null;
            try {
                geoInfo=pick( JSON.parse(result.content), geoProviderFields );
                geoLogger.debug( `Found geoInfo from provider ${geoProviderAPI}.` );
            } catch(error){
                geoLogger.error( `Could not parse the result of ${geoProviderAPI}`, error );
            }
            return Promise.resolve( geoInfo || null );
        }).catch((error) => {
            geoLogger.error( `GeoTracker provider ${geoProviderAPI} is unreachable.`, error );
            return Promise.resolve( null );
        });
    }
    /**
     * @return {Promise} Resolves to a geoInfo object or null
     */
    findGeoInfo() {
        if( !isString( this.ip ) ){
            geoLogger.warn( 'No ip provided, skipping.' );
            return Promise.resolve(null);
        }
        else if( this.ip === '127.0.0.1' || this.ip === '::1' || this.ip === 'localhost' )  return Promise.resolve( 'localhost' );
        else if( this.ip ){
            return this.fromDB().then( ( geoInfo ) => {
                if( geoInfo ) {
                    geoLogger.debug( 'Found geoInfo locally.' );
                    return Promise.resolve( geoInfo );
                } else {
                    return this.fromService();
                }
            });
        }

    }
    /**
     *
     * @param {!string} ip - The ip to be tracked
     */
    constructor( ip ) {
        this.ip = ip;
    }
}

/**
 * @class
 */
class SecurityReport {

    /**
     * @private
     */
    _toRawReport() {
        return pick( this, ['createdAt', 'ip', 'userAgent', 'geoInfo', 'securityContext'] );
    }

    /**
     * @private
     */
    _deliverWithGeoInfo(){
        this._geoTracker.findGeoInfo().then( (geoInfo) => {
            this.geoInfo=geoInfo;
            this._build();
            this.log();
            this._saveLocally();
        }).catch( (error) => this.logger.error('Unexpected error', error) );
    }
    deliver() {
        if(isGeoTrackingEnabled) this._deliverWithGeoInfo();
        else {
            this._build();
            this.log();
            this._saveLocally();
        }

    }
    /**
     * @return {string|*|null}
     * @private
     */
    _build() {
        if( !this._buildObj ) {
            this._buildObj = '\n _______________________________ SERRURIER PARANOID REPORT _______________________________ \n' +
                             stringifyObject( this._toRawReport() ) +
                             '\n _________________________________________________________________________________________ \n';
        }
        return this._buildObj;


    }
    /**
     * @private
     */
    _saveLocally() {
        const report = this._toRawReport();
        report.handledByCron = false;
        ParanoidReports.insert( report );
    }

    log() {
        this.logger.warn( this._build() );
    }

    /**
     *
     * @param {!security_context}  securityContext
     * @param {!object} connection
     */
    constructor( securityContext, connection ) {
        const loggerName = securityContext.action || securityContext.exceptionId || 'default';
        const ip = getp( connection, 'clientAddress' );
        this.logger = new Logger( `suspect-activity:${loggerName}` );
        this.securityContext = securityContext;
        this.ip = ip || UNKNOWN;
        this.userAgent = getp( connection, 'httpHeaders.user-agent' ) || UNKNOWN;
        this.createdAt = new Date();
        this._buildObj = null;
        this.geoInfo = UNKNOWN;
        this._geoTracker = new GeoTracker(ip);
    }
}

/**
 *
 * @param {!object} options
 * @param {boolean} options.geotracking
 * @param {Number} options.ip_cache_ttl
 * @param {Number} options.record_ttl
 */
function config( options ) {
    const { geotracking, ip_cache_ttl, record_ttl } = options;
    // Keep for one day
    ParanoidTrackedIPs._ensureIndex( { createdAt: 1 }, { expireAfterSeconds: ip_cache_ttl || ONE_DAY } );
    // Keep the reports for two months
    ParanoidReports._ensureIndex( { createdAt: 1 }, { expireAfterSeconds: record_ttl || ONE_MONTH } );
    isGeoTrackingEnabled = !!geotracking;
}

export {
    SecurityReport,
    ParanoidReports,
    ONE_DAY,
    ONE_MONTH,
    config
};