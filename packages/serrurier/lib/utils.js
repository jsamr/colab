
export function normalizeStack( stack, type ) {
    let lines = stack.split('\n');
    lines.splice( 0, 3 );
    return `${type} \n${lines.join('\n')}`;
}

export const createSerrurierException = function( name ) {

    function SerrurierException( context={} ) {
        this.stack = normalizeStack( Error.call( this ).stack, this.name );
        this._context = context;
    }
    // See the trickery here : http://stackoverflow.com/a/17891099
    SerrurierException.prototype = Object.create( Error.prototype, {
        constructor: {
            value: SerrurierException,
            writable: false,
            configurable: true
        },
        message : {
            'get': function() {
                return `[${this._context.exceptionId}] ${this._context.reason}`;
            }
        },
        name : {
            value: name
        }
    });
    return SerrurierException;
};