import { Meteor } from 'meteor/meteor';

const INVALID_SOON_S = 30;

export default class MediaNodeConfig {

    clear() {
        this.token = null;
    }

    remainingSecondsBeforeTokenExpires() {
        return this.token.epoch_s-INVALID_SOON_S - new Date().getTime()/1000
    }

    canAuthWithToken() {
        return this.token &&
            this.remainingSecondsBeforeTokenExpires() > 0;
    }

    getRootUrl() {
        throw new Error( 'Not implemented' );
    }

    getCredentials( state ) {
        throw new Error( 'Not implemented' );
    }

    /**
     * @param {!object} config
     * @param {!string} config.appName - The application name used to communicate with medianode
     * @param {Number} [config.RETRY_AFTER_SECONDS]
     * @param {object} [config.SYM_AUTH_ACTION] An action that will be symlinked to AUTH action.
     * @param {object} [config.SYM_RESET_ACTION] An action that will be symlinked to RESET action
     */
    constructor( config ) {
        const { appName, SYM_AUTH_ACTION, SYM_RESET_ACTION, RETRY_AFTER_SECONDS=20 } = config;
        this.appName = appName;
        this.token = null;
        this.SYM_AUTH_ACTION = SYM_AUTH_ACTION;
        this.SYM_RESET_ACTION = SYM_RESET_ACTION;
        this.RETRY_AFTER_SECONDS = RETRY_AFTER_SECONDS;
    }

    /**
     * An action that will be symlinked to AUTH action.
     * @name SYM_AUTH_ACTION
     */

    /**
     * An action that will be symlinked to RESET action.
     * @name SYM_RESET_ACTION
     */
}
