import { normalizeStack } from './utils';

/**
 * An error concerning argument validation
 * @param {!string} message
 * @constructor
 */
export default function ValidationError( message ) {
    var temp = TypeError.call( this );
    this.name = 'ValidationError';
    this.message = message;
    this.stack = normalizeStack( temp.stack, this.name, this.message );
};

// See the trickery here : http://stackoverflow.com/a/17891099
ValidationError.prototype = Object.create( TypeError.prototype, {
    constructor: {
        value: ValidationError,
        writable: true,
        configurable: true
    }
});

