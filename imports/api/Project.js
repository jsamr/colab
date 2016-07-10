import { Mongo } from 'meteor/mongo';
import { Serrurier } from 'meteor/svein:serrurier';
import { AnnotationType } from './AnnotationType';
import { MetaInfoTypes } from './MetaInfoTypes';
import valid from '../validation';
import { roles,
    isLoggedUserInRole_s,
    isUserInRole_s,
    assertLoggedUserInRole_s,
    setUserRole_s,
    revokeLoggedUserRole_s,
    performSecurityChecks,
    eventToContext,
    propagateSecurityException
} from '../security';
import { Plugins } from './Plugins';
import _ from 'lodash';
import Exp from './Exp';
import { getConfig } from './Config';

import { ensures } from 'meteor/svein:serrurier-core';
import { cadenas, server } from 'meteor/svein:serrurier';

import { parts } from 'meteor/svein:serrurier-cadenas-roles';

const projects = new Mongo.Collection('projects');
//noinspection JSUnusedLocalSymbols,JSClosureCompilerSyntax
/**
 * Core entity gathering a set of collaborators with a set of experiments.
 * @class
 * @extends SecuredClass
 * @implements {PartitionClass}
 */
const Project = Serrurier.createClass({
    name:'Project',
    collection:projects,
    secured:{
        insert:false,
        update:false,
        remove:false
    },
    behaviors:{
        softremove:{
            removedFieldName:'_removed'
        },
        partitionRoot:{
            // Adds #getPartition method
        }
    },
    /** @lends Project.prototype */
    methods:{
        /**
         * Check if logged in user has access to role(s) in this project scope (partition)
         * @param {string | string[]} role_s - the role(s) to check current user against
         * @return {boolean} - true if user is logged in and has role in this project scope, false otherwise
         */
        isLoggedUserInRole(role_s){
            this.assertHasBeenSerialized();
            isLoggedUserInRole_s(role_s, this.getPartition());
        },
        /**
         * @throws {Error} If the current project has not been persisted yet.
         */
        assertHasBeenSerialized(){
            if(this._isNew){
                throw new Meteor.Error('operation-not-available', 'Operation cannot be performed while project has not been persisted with Project#save or Project#insert');
            }
        },
        /**
         * Set user role(s) for the scope of this project.
         * @server (server side only)
         * @param {string} userId - The id associated with the user to change role.
         * @param {!string|!string[]} role_s - The role(s) to set
         * @throws { Error } When the caller has no prerogatives to perform this operation.
         */
        @cadenas( 'persisted' )
        setUserRole_s(userId, role_s){
            this.assertLoggedUserInRole_s(roles.project$MANAGER);
            this.assertHasBeenSerialized();
            setUserRole_s(userId, role_s, this.getPartition());
        },
        /**
         * Check if current logged in user is in role for this project' scope and throw an error if he's not
         * @param {!string|!string[]} role_s - The role(s) to check
         * @param {?mongodb_string_id=} userToCheck - Optionally, check that this user id is not equal to logged user id before proceeding assertion.
         * @throws { Error } When the caller has no prerogatives to perform this operation.
         */
        @cadenas( 'persisted' )
        assertLoggedUserInRole_s(role_s, userToCheck=null){
            if(userToCheck === null || userToCheck !== Meteor.userId()){
                assertLoggedUserInRole_s(role_s, this.getPartition());
            }
        },
        /**
         * Check if user has access to role(s) in this project scope (partition)
         * @param {string} userId - the MongoDB user id to check against
         * @param {string | string[]} role_s - the role(s) to check user against
         * @return {boolean} - true if user has role in this project scope, false otherwise
         */
        @cadenas( 'persisted' )
        isUserInRole_s(userId, role_s){
            return isUserInRole_s(userId, role_s, this.getPartition());
        },
        /**
         * @return {Array.<Exp>} - Experiments cursor associated with this project. Not fetched!
         * Meteor.subscribe must have been called.
         */
        getExperiments(){
            return Exp.find({projectId:this._id});
        },
        /**
         * @async
         * @param {Function_meteor_callback=null} asyncCallback
         * @return {boolean} - Whether or not logged user is willing to join this project.
         */
        @cadenas( 'userIsLoggedIn' )
        isPending(asyncCallback=null){
            return  _.includes(this.pending, Meteor.userId());
        },
        /**
         * @return {Object[]} - A list of users which are waiting for a privilege update.
         * @instance
         * @memberof Project#
         */
        @cadenas( 'loggedUserInRole', roles.project$acceptMember, parts.AUTO )
        getPendingUsers(){
            return Meteor.users.find({ _id:{$in: this.pending }}).fetch();
        },
        /**
         *
         */
        @server()
        join(){
            console.warn('I m joining YO!');
        },
        /**
         *
         */
        @server()
        cancelJoin(){
            console.warn('I m canceling YO!');
        },
        /**
         * @desc Update user privileges in project.
         * @param {!string} usedId
         * @param {!string} role - 'associated' or 'responsible' or 'none'
         * @param {Function=} asyncCallback - function (error, result) {...}
         */
        @server()
        updateUserRoleInProject(usedId, role, asyncCallback=null){
            const action='Project#updateUserRoleInProject';
            if(performSecurityChecks(()=>{
                    ensures(action, role, String);
                    this.assertLoggedUserInRole_s(roles.project$MANAGER);
                }, asyncCallback)) return;
            if(Meteor.isServer) {
                if(role === 'associated'){
                    this.setUserRole_s(userId, roles.project$MEMBER);
                } else if (role === 'responsible'){
                    this.setUserRole_s(userId, roles.project$MANAGER);
                } else {
                    this.setUserRole_s(userId, []);
                }
            } else {
                Meteor.call(action, this, ...arguments);
            }
        },
        /**
         * @desc Revoke logged user from project.
         * @param {Function=} asyncCallback - function (error, result) {...}
         */
        @server()
        @cadenas( 'persisted')
        @cadenas( 'userLoggedIn')
        unregisterFromProject(asyncCallback=null){
            revokeLoggedUserRole_s(this.getPartition());
        },
        /**
         * @desc Add logged user to the pending list.
         * @param {Function_meteor_callback=} asyncCallback - function (error, result) {...}
         * @memberof Project#
         * @instance
         */
        @server()
        @cadenas( 'persisted')
        @cadenas( 'userLoggedIn' )
        registerToPendingInProject(asyncCallback){
            //noinspection JSUnusedAssignment
            Project.update(this._id, { $push:{pending:Meteor.userId()} });
        },
        /**
         * @desc Cancel a request to join a project
         * @param {?string=} userId - The unique identifier of the user. Default value (if null or undefined) : Meteor.userId()
         * @param {Function=} asyncCallback - function (error, result) {...}
         */
        @server()
        @cadenas( 'persisted' )
        @cadenas( 'userLoggedIn' )
        @cadenas( 'loggedUserInRole', roles.project$acceptMember, parts.AUTO )
        cancelPendingInProject( userId, asyncCallback=null ){
            //noinspection JSUnusedAssignment
            Project.update( this._id, {$pull: {pending: Meteor.userId()}} );
        },
        /**
         *
         */
        @server()
        acceptPendingRequest(){

        },
        /**
         * @desc Add a new AnnotationType. Does not persist.
         * @param {!AnnotationType} annotationType
         * @param {!Array.<Number>=} childrenIds - An array of numbers corresponding to children Ids of this annotationType
         * @param {boolean=} forceId - If true, don't build up an inferred id.
         */
        addAnnotationType(annotationType, childrenIds=[], forceId=false){
            this.plugins.annotation.pushType(annotationType, childrenIds, forceId);
        },
        /**
         * @desc Remove a task type by Id. Does not persist.
         * @param {Number|AnnotationType} annotationType - Annoration type, or unique identifier
         */
        removeAnnotationType(annotationType){
            this.plugins.annotation.removeType(annotationType);
        },
        /**
         * @desc Replace the current annotationType with the provided one, identified by '_id'. Does not persist.
         * @param {!TaskType} annotationType
         */
        updateAnnotationType(annotationType){
            this.plugins.task.updateType(annotationType);
        },
        @cadenas( 'loggedUserInRole', 'administrator' )
        updateSensitiveData() {
            // ...
            console.info( 'The assertion passed, user is administrator.' );
        },
        /**
         * @desc Add a new TaskType. Does not persist.
         * @param {!TaskType} taskType
         * @param {!Array.<Number>=} childrenIds - An array of numbers corresponding to children Ids of this taskType
         * @param {boolean=} forceId - If true, don't build up an inferred id.
         */
        addTaskType(taskType, childrenIds=[], forceId=false){
            this.plugins.task.pushType(taskType, childrenIds, forceId);
        },
        /**
         * @desc Remove a task type by Id. Does not persist.
         * @memberof Project#
         * @instance
         * @param {Number|TaskType} taskType - A taskType, or a unique identifier
         */
        removeTaskType(taskType){
            this.plugins.task.removeType(taskType);
        },
        /**
         * @desc Replace the current taskType with the provided one, identified by '_id'. Does not persist.
         * @param {!TaskType} taskType
         */
        updateTaskType(taskType){
            this.plugins.task.updateType(taskType);
        }
    },
    /** @lends Project.prototype */
    fields:{
        /**
         * @type {String}
         * @desc String of maximum 10 chars, minimum 3 chars
         */
        acronym:{
            type:String,
            validators:[valid.minMaxLength(3, 10)]
        },
        /**
         * @type {String}
         * @desc String of maximum 300 chars, minimum 10 chars
         */
        fullName:{
            type:String,
            validators:[valid.minMaxLength(10, 300)]
        },
        /**
         * @type {Plugins}
         */
        plugins:{
            type:Plugins,
            default:()=> new Plugins()
        },
        /**
         * @type {boolean}
         */
        isOpen:{
            type:Boolean,
            default:false
        },
        /**
         * @type {boolean}
         */
        publicationPolicy:{
            type:Boolean,
            default:true
        },
        /**
         * Whether or not plugins (annotations and tasks) should be enabled. Can be resolved to enableModules
         * @type {boolean}
         * @default false
         */
        enablePlugins:{
            type:Boolean,
            default:false
        },
        /**
         * @type {string}
         * @default null
         */
        defaultCaptionSource:{
            type:String,
            default:null,
            optional:true
        },
        /**
         * A list of pending user ids that wish to join this project
         * @type {string[]}
         * @default []
         */
        pending:{
            type:[String],
            default:[]
        }
    },
    indexes:{
        uniqAcronym:{
            fields:{
                acronym:1
            },
            options:{
                unique:true
            }
        }
    },
    events:{
        beforeSave(/* e */){
            const conf = getConfig();
            if(!conf.usersCanCreateProject && !isLoggedUserInRole_s(roles.ADMIN)){
                propagateSecurityException( { reason:'Not allowed to create project.', exceptionId: 'create-project-forbidden' } );
            }

        },
        beforeUpdate(e){
            if(!e.trusted && e.currentTarget === e.target){
                e.target.assertLoggedUserInRole_s(roles.project$MANAGER);
            }
        },
        @cadenas( 'userIsLoggedIn' )
        beforeRemove(e){
            if(Meteor.isServer) {
                // TODO softremove Exp
                // TODO softremove Caption
                // TODO softremove Annotation
                // TODO softremove Task.
                Roles.removePartition(e.target.getPartition());
            }
        }
    }
});

export default Project ;

