import { Mongo } from 'meteor/mongo'
import Serrurier from 'meteor/svein:serrurier'

const tasks = new Mongo.Collection('plugins.tasks')

const Task = Serrurier.createClass({
  name: 'Task',
  collection: tasks,
  secured: {
    insert: true,
    update: true,
    remove: true
  },
  fields: {
    taskTypeId: Number,
    expId: String,
    segments: [Object],
    projectId: String
  },
  behaviors: {
    softremove: {
      removedFieldName: '_removed'
    }
  },
  indexes: {
    uniqTaskType: {
      fields: {
        taskTypeId: 1,
        expId: 1
      },
      options: {
        unique: true
      }
    }
  }
})

export default Task
