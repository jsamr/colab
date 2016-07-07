import { ensures, ensuresArg } from '../ensures';
import ValidationError from '../ValidationError';
import each from 'lodash/each';
import create from 'lodash/create';
import partial from 'lodash/partial';
import { Match } from 'meteor/check';
import { Assertion }  from './Assertion';
const assertors = new Map();


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
    let assertor = assertors.get( name );
    let args = Match.test( params, Array )? params : [];
    if (!assertor) throw Error( `No Assertor found with name '${name}'.
    Currently registered assertors are : '${Array.from(assertors.keys()).join(', ')}'.
    To register a new Assertor, simply instanciate it with \'new DefaultAssertor\' or \`new MethodParamAssertor\`.` );
    return assertor.toAssertion( args, methodNameGetter );
}

export function validateArguments( args, matchPatterns, nameFunc ) {
    let i = 0;
    each( matchPatterns, ( pattern, argName ) => {
        if(i > args.length) throw new ValidationError( `${nameFunc()} Missing argument ${argName})}` );
        ensuresArg( `In function \`${nameFunc()}\` the param \`${argName}\``, args[i], pattern );
        i++;
    });
}

/**
 * @class
 */
export class Assertor {

    /**
     * @param {!Assertor | string } assertor - The assertor to get a partial from, or its name
     * @param {!object} config
     * @param {!string} config.name
     * @param {!string} config.reason
     * @param {...*} partials - The partials to be applied to the {@link Assertor#doesAssertionFails} method.
     * @see _.partial
     */
    static partialFrom( assertor, config, ...partials ){
        const  { name, reason } = config;
        ensuresArg( 'In static method `Assertor.partialFrom` : param `config.name`', name, String );
        ensuresArg( 'In static method `Assertor.partialFrom` : param `config.reason`', reason, String );
        ensures( 'In static method `Assertor.partialFrom` : param `assertor` must be a `string` or instance of `Assertor`"', assertor, Match.OneOf( String, Assertor ) );
        if(Match.test( assertor, String )) assertor = assertors.get( assertor );
        if(!assertor) throw new Error( `Assertor ${assertor} does not exist` );
        const partial = create( assertor, Object.assign( config, {
            toAssertion: function( args, methodNameGetter ) {
                partials.push( ...args );
                assertor.toAssertion.call(this, partials, methodNameGetter);
            }}));
        assertors.set( name, partial );
        return partial;
    }

    /**
     * @param {Array} args
     * @private
     */
    _validateArgument( args ){
        validateArguments( args, this.matchPatterns, () => `Assertor ${this.name}` );
    }

    /**
     * @param {!Array} assertorArgs - Any argument to be given to {@link Assertor#doesAssertionFails}
     * @param {Function} methodNameGetter
     * @return {Assertion}
     */
    toAssertion( assertorArgs, methodNameGetter ){
        this._validateArgument( assertorArgs );
        this._methodNameGetter = methodNameGetter;
        const AssertionClass = this.AssertionClass;
        const fullAssertionFails = partial( this.doesAssertionFails, ...assertorArgs );
        const assertor = this;
        return new AssertionClass( assertor, fullAssertionFails, methodNameGetter, assertorArgs );
    }
    /**
     * @param {!object} config - An object holding the instantiation params
     * @param {!Function} config.AssertorClass - The assertor class (constructor) to instantiate.
     * @param {!string} config.name
     * @param {!Function_predicate} config.doesAssertionFails - A function that returns truthy if the assertion fails, false otherwise. If the return value is a string,
     * it will be appended to the 'reason' {@link security_context}.
     * @param {!string} config.reason
     * @param {!string} config.errorId
     * @param {Object.<string, meteor_match_pattern>=} config.matchPatterns - A dictionary of match patterns which keys are argument names
     * @param {Object<string, Array.<*>>=} config.includedAssertorDescriptors - Assertors this assertor depends on : a dictionary which keys are assertor names, and values are a list of arguments
     * to pass to the assertor {@link Function_predicate}
     */
    constructor(config){
        ensuresArg('In `Assertor` constructor : param `config`', config, Object);
        const { AssertionClass, name, doesAssertionFails, reason, matchPatterns={}, includedAssertorDescriptors={}} = config;
        ensuresArg( 'In `Assertor` constructor : param `config.AssertionClass` must be a class inheriting from `AbstractAssertion`"', AssertionClass.prototype, Assertion );
        ensuresArg( 'In `Assertor` constructor : param `config.doesAssertionFails`', doesAssertionFails, Function );
        ensuresArg( 'In `Assertor` constructor : param `config.name`', name, String );
        ensuresArg( 'In `Assertor` constructor : param `config.reason`', reason, String );
        ensuresArg( 'In `Assertor` constructor : param `config.matchPatterns`', matchPatterns, Object );
        ensuresArg( 'In `Assertor` constructor : param `config.includedAssertorDescriptors`', includedAssertorDescriptors, Object );
        this.AssertionClass = AssertionClass;
        this.doesAssertionFails = doesAssertionFails;
        this.name = name;
        this.reason = reason;
        this.errorId = `assert:${name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;
        this.matchPatterns = matchPatterns;
        this.includedAssertorDescriptors = includedAssertorDescriptors;
        if(assertors.get( name )) throw new Error( `Assertor ${name} already exists` );
        assertors.set( name, this );
    }
}