import { Mongo } from 'meteor/mongo';
import { Checkpoints } from 'meteor/svein:astro-checkpoints';

const tasks = new Mongo.Collection('plugins.tasks');

const Task = Checkpoints.createClass({
    name:'Task',
    collection:tasks,
    secured:{
        insert:true,
        update:true,
        remove:true
    },
    fields:{},
    behaviors:{
        softremove:{
            removedFieldName:'_removed'
        }
    },
    indexes:{
        uniqTaskType:{
            fields:{
                taskTypeId:1,
                expId:1
            },
            options:{
                unique:true
            }
        }
    }
});

export default Task;