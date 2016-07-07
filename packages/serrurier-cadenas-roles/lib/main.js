import { DefaultAssertor } from 'meteor/svein:serrurier';
import { Roles } from 'meteor/alanning:roles';
import { Match } from 'meteor/check';
import {
    isUserInRole_s,
    isLoggedUserInRole_s,
} from './roles-utils';

//noinspection JSValidateTypes
/**
 * @desc A partition that resolves with this.getPartition()
 * @type {role_partition}
 */
const AUTO = {};

/**
 * @desc A partition that resolves to the global partition
 * @type {role_partition}
 */
//noinspection JSUnresolvedVariable
const GLOBAL = Roles.GLOBAL_PARTITION;


/**
 * Assert logged user is in [roles]|role, parition
 */
const loggedUserInRole = new DefaultAssertor({
    name: 'loggedUserInRole',
    doesAssertionFails: function ( role_s, partition = GLOBAL ) {
        if( partition === AUTO ){
            partition = this.getPartition();
        }
        return !isLoggedUserInRole_s( role_s, partition ) ? `role : ${role_s}, partition: ${partition === GLOBAL ? 'GLOBAL' : partition}` : false;
    },
    reason: 'User must be in ',
    matchPatterns: {
        role_s: Match.OneOf( String, [String] ),
        partition: Match.OneOf( String, Match.Where((val) => val === GLOBAL || val === AUTO ) )
    },
    includedAssertorDescriptors: { userIsLoggedIn: [] }

});

const parts = {
    GLOBAL,
    AUTO
};

export {
    loggedUserInRole,
    parts
}