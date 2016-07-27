import { Mongo } from 'meteor/mongo'
import Serrurier from 'meteor/svein:serrurier'
import Project from './Project'
const experiments = new Mongo.Collection('exps')
import Session from '../medianode/Session'
import { raw } from '../time'
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
    getReadableDuration () {
      return raw.readable(this.duration)
    },
    updateTaskSegment () {},
    createTaskIfNotExists () {},
    insertCaptions () {},
    createSession () {
      return new Session(this)
    },
    /**
     * @returns {ProjectCard}
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
  fields: {
    name: String,
    duration: Number,
    date: String,
    projectId: String,
    ownerId: String,
    synchronized: Boolean,
    prevalidatedTech: Boolean,
    published: Boolean
  },
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
