import { normalizeStack } from './utils';

/**
 * An error related to a prohibited operation.
 * @constructor SecurityException
 */
export function SecurityException( context={} ) {
    var temp = Error.call( this );
    this.name = 'SecurityException';
    this._context = context;
    this.message = `[${this._context.errorId}] ${this._context.reason}`;
    this.stack = normalizeStack( temp.stack, this.name, this.message );
}

// See the trickery here : http://stackoverflow.com/a/17891099
SecurityException.prototype = Object.create( Error.prototype, {
    constructor: {
        value: SecurityException,
        writable: true,
        configurable: true
    }
} );

export default SecurityException;
