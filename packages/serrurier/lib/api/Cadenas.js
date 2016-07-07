import { ensures, ensuresArg } from '../ensures';
import ValidationError from '../ValidationError';
import each from 'lodash/each';
import create from 'lodash/create';
import partial from 'lodash/partial';
import { Match } from 'meteor/check';
import { Assertion }  from './Assertion';
const cadenasMap = new Map();


/**
 * @param {!Function} methodNameGetter
 * @param {string} name
 * @param {Array=} params
 * @return {Assertion}
 */
export function buildAssertion( methodNameGetter, name, params ) {
    ensuresArg( 'In function `buildAssertion` param `methodNameGetter`', methodNameGetter, Function );
    ensuresArg( 'In function `buildAssertion` param `name`', name, String );
    ensuresArg( 'In function `buildAssertion` param `params`', params, Match.Optional(Array) );
    let cadenas = cadenasMap.get( name );
    let args = Match.test( params, Array )? params : [];
    if (!cadenas) throw Error( `No cadenas found with name '${name}'.
    Currently registered cadenas are : '${Array.from(cadenasMap.keys()).join(', ')}'.
    To register a new Cadenas, simply instanciate it with \'new DefaultCadenas\' or \`new MethodParamAssertor\`.` );
    return cadenas.toAssertion( args, methodNameGetter );
}

export function validateArguments( args, matchPatterns, nameFunc ) {
    let i = 0;
    each( matchPatterns, ( pattern, index ) => {
        if(i > args.length) throw new ValidationError( `${nameFunc()} Missing argument n°${index})}` );
        ensuresArg( `In \`${nameFunc()}()\` the param at index \`${index}\``, args[i], pattern );
        i++;
    });
}

/**
 * @class
 */
export class Cadenas {

    /**
     * @param {!Cadenas | string } cadenas - The cadenas to get a partial from, or its name
     * @param {!object} config
     * @param {!string} config.name
     * @param {!string} config.reason
     * @param {...*} partials - The partials to be applied to the {@link Cadenas#doesAssertionFails} method.
     * @see _.partial
     */
    static partialFrom( cadenas, config, ...partials ){
        const  { name, reason } = config;
        ensuresArg( 'In static method `Cadenas.partialFrom` : param `config.name`', name, String );
        ensuresArg( 'In static method `Cadenas.partialFrom` : param `config.reason`', reason, String );
        ensures( 'In static method `Cadenas.partialFrom` : param `cadenas` must be a `string` or instance of `Cadenas`"', cadenas, Match.OneOf( String, Cadenas ) );
        if(Match.test( cadenas, String )) cadenas = cadenasMap.get( cadenas );
        if(!cadenas) throw new Error( `Cadenas ${cadenas} does not exist` );
        const partial = create( cadenas, Object.assign( config, {
            toAssertion: function( args, methodNameGetter ) {
                partials.push( ...args );
                cadenas.toAssertion.call(this, partials, methodNameGetter);
            }}));
        cadenasMap.set( name, partial );
        return partial;
    }

    /**
     * @param {Array} args
     * @private
     */
    _validateArgument( args ){
        validateArguments( args, this.matchPatterns, () => `Cadenas ${this.name}` );
    }

    /**
     * @param {!Array} assertorArgs - Any argument to be given to {@link Cadenas#doesAssertionFails}
     * @param {Function} methodNameGetter
     * @return {Assertion}
     */
    toAssertion( assertorArgs, methodNameGetter ){
        this._validateArgument( assertorArgs );
        this._methodNameGetter = methodNameGetter;
        const AssertionClass = this.AssertionClass;
        const fullAssertionFails = partial( this.doesAssertionFails, ...assertorArgs );
        const cadenas = this;
        return new AssertionClass( cadenas, fullAssertionFails, methodNameGetter, assertorArgs );
    }
    /**
     * @param {!object} config - An object holding the instantiation params
     * @param {!Function} config.AssertorClass - The cadenas class (constructor) to instantiate.
     * @param {!string} config.name
     * @param {!Function_predicate} config.doesAssertionFails - A function that returns truthy if the assertion fails, false otherwise. If the return value is a string,
     * it will be appended to the 'reason' {@link security_context}.
     * @param {!string} config.reason
     * @param {!string} config.errorId
     * @param {Array.<meteor_match_pattern=} config.matchPatterns - An array of match patterns to validate the doesAssertionFails method
     * @param {Object<string, Array.<*>>=} config.dependingCadenas - Cadenas this cadenas depends on : a dictionary which keys are cadenas names, and values are a list of arguments
     * to pass to the cadenas {@link Function_predicate}
     */
    constructor(config){
        ensuresArg('In `Cadenas` constructor : param `config`', config, Object);
        const { AssertionClass, name, doesAssertionFails, reason='', matchPatterns=[], dependingCadenas={}} = config;
        ensures( 'In `Cadenas` constructor : param `config.AssertionClass` must be a class inheriting from `AbstractAssertion`. ' +
            'Are you sure you didn\'t mean to call a concrete constructor like `new DefaultCadenas()`?`"', AssertionClass.prototype, Assertion );
        ensuresArg( 'In `Cadenas` constructor : param `config.doesAssertionFails`', doesAssertionFails, Function );
        ensuresArg( 'In `Cadenas` constructor : param `config.name`', name, String );
        ensuresArg( 'In `Cadenas` constructor : param `config.reason`', reason, String );
        ensuresArg( 'In `Cadenas` constructor : param `config.matchPatterns`', matchPatterns, Array );
        ensuresArg( 'In `Cadenas` constructor : param `config.dependingCadenas`', dependingCadenas, Object );
        this.AssertionClass = AssertionClass;
        this.doesAssertionFails = doesAssertionFails;
        this.name = name;
        this.reason = reason;
        this.errorId = `cadenas:${name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;
        this.matchPatterns = matchPatterns;
        this.dependingCadenas = dependingCadenas;
        if(cadenasMap.get( name )) throw new Error( `Cadenas ${name} already exists` );
        cadenasMap.set( name, this );
    }
}