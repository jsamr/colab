import { Event, Class } from 'meteor/jagi:astronomy';
import { Match } from 'meteor/check';
import { ActionsStore } from '../core'
import { ensures, ensuresArg } from '../ensures';
import first from 'lodash/head';
import partial from 'lodash/partial';
import Logger from '../Logger';
import { Meteor } from 'meteor/meteor';
import getp from 'lodash/get';
const logger = new Logger('maker:secure');

let isApiLocked = false;

const reportersMap = new Map();
const serverReportersNames = new Set();

/**
 * @desc serialize any Astro.Class instance
 * @param {!Astro.Class} target
 * @return {object} A serializable target
 */
function makeTargetSerializable( target ){

    if(Match.test( target, Class )) {
        const className=target.constructor.getName(),
            serial={};
        //noinspection JSUnresolvedFunction
        serial[className]=target.raw();
        return serial;
    } else logger.warn( 'The target of a decoration should always be an instance of  `Astro.Class`' );

}

/**
 *
 * @param {Astro.Event} e - an event from Astronomy events.
 * @param {Astro.Class} e.target - the target of the event
 * @param {Astro.Class} e.currentTarget - the current target of the event
 * @return {security_context}
 */
function eventToContext( e ){
    ensuresArg('In function `eventToContext`, param `e`', e, Event);
    const context = {
        target:makeTargetSerializable(e.target)
    };
    if(e.currentTarget !== e.target){
        context.currentTarget=makeTargetSerializable(e.currentTarget);
    }
    return context;
}

/**
 * @desc Run a function securely, reporting any suspect activity. 'this' must be bound, if ever used.
 * @param {!Function} func
 * @param {...*} args
 */
function runSecurely( func, ...args ){
    try {
        return func.apply( this, args );
    } catch(e){
        const possibleEvent =  first(args);
        const Error = Object.getPrototypeOf( e ).constructor;
        const handlers = reportersMap.get( Error );
        const action = ActionsStore.getProp( func, 'descriptor' );
        const isEventHandler = possibleEvent instanceof Event;
        let context = Object.assign( e._context || {}, { action }, (() => {
            if( isEventHandler ) return eventToContext( possibleEvent );
            //noinspection JSCheckFunctionSignatures
            else return { target: makeTargetSerializable( this ) }
        })());
        if(isEventHandler && Meteor.isServer) possibleEvent.preventDefault();
        if(Match.test( handlers, Array ) && handlers.length) {
            handlers.forEach( ( handler ) => handler.call( this, context ) );
            // if ca callback is present, call it.
            if(e._callback) e._callback.call( this, e, null );
        }
        else {
            // if ca callback is present, call it.
            if(e._callback) e._callback.call( this, e, null );
            else throw e;
        }
    }
}


/**
 * @desc Make a function secured, i.e. {@link runSecurely}
 * @param {!Function} func
 * @return {Function}
 */
export function makeSecure( func ){
    // TODO investigate why already defined methods
    if(!ActionsStore.getProp( func, 'isSecured' )){
        ActionsStore.setProp( func, 'isSecured', true );
        return partial( runSecurely, func );
    } else {
        return func;
    }
}


function _registerReporter( ErrorClass, reporter ) {
    if(!reportersMap.has( ErrorClass )) reportersMap.set( ErrorClass, [] );
    reportersMap.get( ErrorClass ).push( reporter );
}
/**
 *
 * @param {!Function} ErrorClass - The error constructor.
 * @param {function( {object} context )} reporter
 */
export function registerReporter( ErrorClass, reporter ) {
    if(!isApiLocked) {
        ensuresArg( 'In function `registerReporter`, arg `ErrorClass`', ErrorClass, Function );
        ensuresArg( 'In function `registerReporter`, arg `reporter`', reporter, Function );
        _registerReporter( ErrorClass, reporter );
    }
}

function createReportName( ErrorClass, name ) {
    ensuresArg( 'In function `registerReporter`, arg `ErrorClass`', ErrorClass, Function );
    ensuresArg( 'In function `registerReporter`, arg `name`', name, Match.Optional( String ) );
    let methodName = name ;
    if(!name) {
        const errorName = getp( ErrorClass, 'prototype.name' );
        ensures( 'The ErrorClass must have a `ErrorClass.prototype.name`', errorName, String );
        methodName = '/serrurier/decorators/security/'+errorName;
        ensures( 'In `registerServerHandler` : a server handler is already registered to this error. You can provide a name as third argument to work around this limitation.',
            serverReportersNames.has( methodName ), false );
    } else ensures( 'A server handler is already registered to this error. Provide a different name (third argument).',
        serverReportersNames.has( methodName ), false );
    serverReportersNames.add( methodName );
    return methodName;
}

/**
 * @locus server
 * @param {!Function} ErrorClass - The error constructor. The field `Error.prototype.name` must exist if you don't want to provide the third argument (name).
 * @param {function( {object} context )} serverReporter
 * @param {String} [name] - The name of the Meteor method that will be used in the background. Default is namespaced by '/serrurier/'.
 */
export function publishServerReporter(ErrorClass, serverReporter, name ) {
    if(!isApiLocked) {
        if(Meteor.isServer) {
            ensuresArg( 'In function `registerReporter`, arg `serverReporter`', serverReporter, Function );
            const methodName = createReportName( ErrorClass, name );
            // register the method
            Meteor.methods({ [methodName]: serverReporter });
        } else {
            throw new Error('The function `publishServerReporter` must be called on server. When published on server, subscribe to it with `subscribeServerReporter`.')
        }
    }
}

/**
 *
 * @locus client
 * @param {!Function} ErrorClass - The error constructor. The field `Error.prototype.name` must exist if you don't want to provide the third argument (name).
 * @param {String} [name] - The name of the Meteor method that will be used in the background. Default is namespaced by '/serrurier/'.
 */
export function subscribeServerReporter( ErrorClass, name ) {
    if(!isApiLocked) {
        if(Meteor.isClient) {
            const methodName = createReportName(ErrorClass, name);
            _registerReporter(ErrorClass, partial(Meteor.call, methodName));
        } else {
            throw new Error('The function `subscribeServerReporter` must be called on client. When subscribed on client, publish to it with `publishServerReporter`.')
        }
    }
}

export function lockApi() {
    isApiLocked = true;
}