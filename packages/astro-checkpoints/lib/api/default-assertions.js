/** @module assertions */

import { Class } from 'meteor/jagi:astronomy';
import DefaultAssertor from './DefaultAssertor';
import MethodParamsAssertor from './MethodParamsAssertor';
import { validateArguments } from './Assertor';
import ValidationError from '../ValidationError';

const userIsLoggedIn= new DefaultAssertor({
    name: 'userIsLoggedIn',
    doesAssertionFails: () => {
        return !Meteor.userId()
    },
    reason: 'Must be logged in.'
});


/**
 * Assert running on server
 */
const onServer = new DefaultAssertor({
    name: 'onServer',
    doesAssertionFails: () => !Meteor.isServer,
    reason: 'Cannot be run client side.'
});


/**
 * Assert user [userId] exists
 */
const userExists = new DefaultAssertor({
    name: 'userExists',
    doesAssertionFails: (userId) => !Meteor.users.findOne(userId, {_id:1}),
    reason: 'User does not exists.',
    matchPatterns: { userId: String },
    includedAssertorDescriptors: { 'onServer': [] }
});

/**
 *Assert method arguments are matching {meteor_match_pattern}s
 */
const matchParams = new MethodParamsAssertor({
    name:'matchParams',
    doesAssertionFails: function( methodMatchPatterns ) {
        try{
            validateArguments(this.astroMethodParams, methodMatchPatterns, () => `Method ${this.getMethodName()} arguments are invalid. `);
        } catch(e) {
            if(e instanceof ValidationError){
                return e.message;
            } else throw e;
        }
        return false;
    },
    reason: 'Invalid method arguments.',
    matchPatterns: { methodMatchPatterns: Object }
});

/**
 * Assert this document (Astro.Class instance) has been persisted in db
 */
const persisted = new DefaultAssertor({
    name:'persisted',
    doesAssertionFails: function() {
        return this._isNew === true;
    },
    reason: 'Cannot call this method before its target has been persisted.'
});

/**
 * Assert the user is logged
 */
const userLoggedIn = new DefaultAssertor({
    name:'userLoggedIn',
    doesAssertionFails: () => !Meteor.userId(),
    reason:'Must be logged in.'
});




/**
 * All the available assertions. You can compose them with {@link Assertion.partialFrom}
 * @type {Object.<string, Assertion>}
 */
export default assertions = {
    onServer,
    userExists,
    matchParams,
    persisted,
    userLoggedIn
};
