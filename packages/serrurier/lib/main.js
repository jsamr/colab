import { Class } from 'meteor/jagi:astronomy';
import server from './server-decorator';
import cadenas from './cadenas-decorator';
import './api/default-cadenas';
import { decorateDescription } from 'meteor/svein:serrurier-decorators-core'

import { Cadenas } from './api/Cadenas';
import DefaultCadenas from './api/DefaultCadenas';
import MethodParamsCadenas from './api/MethodParamsCadenas';
import { ensuresArg } from './ensures';

/**
 * The Serrurier helpers to build secured `Astro.Class`s
 * @type {
 *   {
 *     createClass: (function(!Object): Astro.Class),
 *     inheritClass: (function(!Astro.Class, !Object): Astro.Class),
 *     extendClass: (function(!Astro.Class, !Object))
 *   }
 * }
 */
const Serrurier = {
    /**
     * Create a secured class, same as Astro.Class.create but with decorator functionality.
     * @param {!object} description - A description of the Astro Class to decorate.
     * @returns {Astro.Class} An Astro Class.
     */
    createClass( description ) {
        ensuresArg( 'In `Serrurier.createClass` : argument `description`', description, Object );
        return Class.create( decorateDescription( description ) );
    },
    /**
     * Inherit securely from a Class, same as Astro.Class.inherit but with decorator functionality.
     * @param {!Astro.Class} Clazz - The Class to inherit from.
     * @param {!object} description
     * @returns {Astro.Class} An Astro Class inheriting from Clazz
     */
    inheritClass( Clazz, description ) {
        ensuresArg( 'In method `Serrurier.inheritClass` : argument `description`', description, Object );
        ensuresArg( 'In method `Serrurier.inheritClass` : argument `Clazz`', Clazz, Function );
        return Clazz.inherit( decorateDescription( description ) );
    },
    /**
     * Extend securely a Class, same as Astro.Class.extend but with decorator functionality.
     * @param {!Astro.Class} Clazz - The Class to extend.
     * @param {!object} description
     */
    extendClass( Clazz, description ) {
        ensuresArg( 'In method `Serrurier.extendClass` : argument `description`', description, Object );
        ensuresArg( 'In method `Serrurier.extendClass` : argument `Clazz`', Clazz, Function );
        Clazz.extend( decorateDescription( description ) );
    },
    /**
     *
     * @param {!Function} Error - The constructor of the error to listen to
     * @param {function({object} error)} handler - The hook that will be called when it's associated error type is thrown.
     */
    registerReporter( Error, handler ) {

    },
    /**
     *
     * @param {!Function} Error - The constructor of the error to listen to
     * @param {function({object} error)} handler - The hook that will be called when it's associated error type is thrown.
     */
    registerServerReporter( Error, handler ) {

    }

};

export {
    server,
    cadenas,
    Serrurier,
    DefaultCadenas,
    MethodParamsCadenas
};

export default Serrurier;