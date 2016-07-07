import { Event, Class } from 'meteor/jagi:astronomy';
import { Match } from 'meteor/check';
import ActionsStore from '../ActionsStore'
import { ensures, ensuresArg } from '../ensures';
import SecurityException from '../SecurityException';
import first from 'lodash/head';
import partial from 'lodash/partial';
import Logger from '../Logger';

const logger = new Logger('maker:secure');

/**
 * @desc serialize any Astro.Class instance
 * @param {!Astro.Class} target
 * @return {object} A serializable target
 */
function makeTargetSerializable( target ){

    if(Match.test( target, Class) ) {
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
        if( e instanceof SecurityException ){
            const descriptor = ActionsStore.getProp( func, 'descriptor' );
            const isEventHandler = possibleEvent instanceof Event;
            let context = Object.assign( e._context, { descriptor }, (() => {
                if( isEventHandler ) return eventToContext( possibleEvent );
                else {
                    //noinspection JSCheckFunctionSignatures
                    return { target: makeTargetSerializable(this) }
                }
            })());
            if( Meteor.isClient && !Meteor.isDevelopment ) logger.debug( 'reporting failed assertion' );
            Meteor.call( 'security.reportSuspectActivity', context );
            if( isEventHandler ) {
                if(Meteor.isServer){
                    //TODO investigate 'if server'
                    possibleEvent.preventDefault();
                }
            }
        } else throw e;
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