import { Mongo } from 'meteor/mongo'
import Serrurier from 'meteor/svein:serrurier'
import Project from './Project'
const experiments = new Mongo.Collection('exps')
import Session from '../medianode/Session'
/**
 * An experiment
 * @constructor
 */
const Exp = Serrurier.createClass({
  name: 'Exp',
  collection: experiments,
  secured: {
    insert: true,
    update: true,
    remove: true
  },
  /** @lends Exp.prototype */
  methods: {
    updateTaskSegment () {},
    createTaskIfNotExists () {},
    insertCaptions () {},
    createSession () {
      return new Session(this)
    },
    /**
     * @returns {Project}
     */
    getProject () {
      return Project.findOne(this.projectId)
    }
  },
  behaviors: {
    softremove: {
      removedFieldName: '_removed'
    }
  },
  /** @lends Exp.prototype */
  fields: {},
  indexes: {
    uniqProject: {
      fields: {
        name: 1,
        projectId: 1
      },
      options: {
        unique: true
      }
    },
    // TODO Check this index utility
    textWeight: {
      fields: {
        name: 'text'
      },
      options: {
        weights: {
          name: 10
        }
      }
    }
  }
})

export default Exp
