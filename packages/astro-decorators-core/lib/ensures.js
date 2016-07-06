import { Match } from 'meteor/check';
import ValidationError from './ValidationError';


/**
 *
 * @param {!string} message - A message helping with error tracking.
 * @param {*} toCheck - object or type to validate
 * @param pattern - a {@link http://docs.meteor.com/api/check.html#matchpatterns Meteor.Match} pattern
 */
export default function ensures(message, toCheck, pattern){
    if(!Match.test(toCheck, pattern)){
        throw new ValidationError(`${message} didn't match required pattern.`);
    }
}

/**
 *
 * @param predicate
 * @return {object} {@link http://docs.meteor.com/api/check.html#matchpatterns Meteor Match Pattern}
 */
ensures.Where=function(predicate){
    return Match.Where(predicate);
};

/**
 *
 * @type {Object}
 * @desc {@link http://docs.meteor.com/api/check.html#matchpatterns Meteor.Match} pattern the validates when is string and non empty.
 */
ensures.IsNonEmptyString=ensures.Where((val) => {
    check(val, String);
    return val.length > 0;
});
