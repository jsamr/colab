import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { roles } from './security';
import { Roles } from 'meteor/alanning:roles';

console.warn("Dangerous Mock unsecure-mock.js to be removed later in the project");
let found=null;
if(Meteor.isServer){
    found=Meteor.users.findOne({username:'dumby'});
    if(found) Meteor.users.remove(found._id);
    const admin=Accounts.createUser({
        username:'dumby',
        email:'dumb@dumby.con',
        password:'imthedumbest',
        profile:{}
    });
    Roles.addUsersToRoles(admin, roles.ADMIN);
} else {
    Meteor.loginWithPassword({
        username:'dumby'
    }, 'imthedumbest');

}