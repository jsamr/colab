import { MetaInfoTypes } from './MetaInfoTypes';
import { TaskType } from './TaskType';
import { roles, eventToContext } from '../security';

//noinspection JSValidateTypes,JSClosureCompilerSyntax

/**
 * @class
 * @classdesc A set of {@link TaskType}
 * @extends {MetaInfoTypes}
 */
export const TaskTypes=MetaInfoTypes.inherit({
    name:'TaskTypes',
    fields:{
        /**
         * @type {TaskType[]}
         * @instance
         * @memberof TaskTypes#
         * @default []
         */
        _types:{
            type:[TaskType],
            default:[]
        }
    },
    methods:{
        /**
         * @instance
         * @memberof TaskTypes#
         * @return {Class.<TaskType>} The TaskType Class.
         */
        getTypeClass(){
            return TaskType;
        }
    },
    events:{
        beforeUpdate(e){
            if(!e.trusted){
                e.target.assertLoggedUserInRole_s(roles.project$editTaskType);
            }
        }
    }
});
