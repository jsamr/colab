import { check, Match } from 'meteor/check';

/**
 *
 * @param {!string} message - A message helping with error tracking.
 * @param {*} arg - object to validate
 * @param pattern - a {@link http://docs.meteor.com/api/check.html#matchpatterns Meteor MatchPattern}
 * @throws TypeError, if one match fails
 */
export function ensuresArg( message, arg, pattern ){
    if( !Match.test( arg, pattern ) ){
        let details = "";
        let ofType = typeof arg;
        switch(pattern) {
            case Object :
                details = ' should be an object';
                break;
            case Function :
                details = ' should be a function';
                break;
            case String :
                details = ' should be a string';
                break;
            case Number :
                details = ' should be a number';
                break;
            case Match.Integer :
                details = ' should be an integer';
                break;
            default :
                details = ' didn\'t match the required pattern : ';
                try {
                    check( arg, pattern );
                } catch( e ){
                    details += e.message.replace( 'Match error:', '' );
                }
        }
        throw new TypeError(`${message} of type \`${ofType}\` ${details}.`);
    }
}

/**
 *
 * @param {!string} message
 * @param {*} toCheck - object to validate
 * @param  pattern - a {@link http://docs.meteor.com/api/check.html#matchpatterns Meteor MatchPattern}
 * @throws TypeError, if one match fails
 */
export function ensures ( message, toCheck, pattern ) {
    if (!Match.test( toCheck, pattern )) {
        throw new TypeError( message );
    }
}

/**
 *
 * @type {Object}
 * @desc {@link http://docs.meteor.com/api/check.html#matchpatterns Meteor.Match} pattern the validates when is string and non empty.
 */
export const IsNonEmptyString = Match.Where((val) => {
    check(val, String);
    return val.length > 0;
});
