
/**
 * An error related to a prohibited operation.
 * Wish we could extend Error type but it is not possible with babel (ES6 transcompiler) for retro-compatibily reasons.
 * {@link http://stackoverflow.com/questions/33870684/why-doesnt-instanceof-work-on-instances-of-error-subclasses-under-babel-node why deoesn't instanceof work on error subclasses on babel node}
 * @class SecurityException
 */
export default class SecurityException {

    get getMessage() {
        return `[${this._context.errorId}] ${this._context.reason}`;
    }
    /**
     * @param {!security_context} context
     */
    constructor(context){
        this.name = 'SecurityException';
        this._context = context;
    }

    /**
     * @name SecurityException#stack
     * @type {string}
     */
}