import { parts } from 'meteor/svein:serrurier-cadenas-roles';
import { DefaultCadenas } from 'meteor/svein:serrurier';
import { roles } from './security';
//noinspection JSCheckFunctionSignatures

/**
 *
 * @return {boolean} true if logged user is verified, or verify email policy is disabled
 */
export function checkAgainstVerifiedEmailPolicy(){
    return !Meteor.settings.public.enableVerifyEmailSecurityPolicy ||
        getp(Meteor.user(),'emails[0].verified') === true;
}

/**
 * Assert the logged user is admin
 */
const loggedUserIsAdmin = DefaultCadenas.partialFrom( 'loggedUserInRole' , {
    name: 'loggedUserIsAdmin',
    reason: 'Must be admin.'
}, roles.ADMIN );

