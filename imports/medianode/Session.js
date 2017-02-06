import { CANCEL } from 'redux-saga'
import { getConfig } from '/imports/api/Config'
import { asyncGet } from './async'
import isString from 'lodash/isString'
import errors from './server-errors'
import path from 'path'
import autobind from 'autobind-decorator'
import { ensuresArg } from '/imports/ensure'
import Exp from '/imports/api/Exp'
import Project from '/imports/api/Project'

@autobind
class Session {

  buildRequesPlacesUrl () {
    const config = getConfig()
    return path.join(config.videoServer.url, `/i/${this.project.acronym}/${this.experiment.name}`)
  }

  buildPlaceUrl (place) {
    const config = getConfig()
    const a = this.application
    const t = this.token
    return path.join(config.videoServer.url, `/m/${this.project.acronym}/${this.experiment.name}/${place}?a=${a}&t=${t}`)
  }

  buildError (errorCode) {
    const error = new Error(errors[errorCode])
    error.errorCode = errorCode
    return error
  }
  /**
   * @return {Promise} Accepted value is a list of spots, rejected value is a string describing the error.
   */
  requirePlaces () {
    let xhr = null
    const promise = new Promise((resolve, reject) => {
      const a = this.application
      const t = this.token
      asyncGet(this.buildRequesPlacesUrl(), { params: { a, t }, beforeSend: (aXhr) => xhr = aXhr })
        .then((result) => {
          const data = result.data
          if (isString(data)) {
            const errorCode = errors[data] ? data : 'UNKNOWN_ERR'
            reject(this.buildError(errorCode))
          } else {
            resolve(data.places)
          }
        })
        .catch((error) => {
          const hasStandardError = error.response && error.response.data
          let errorCode = ''
          if (hasStandardError) errorCode = errors[error.response.data] ? error.response.data : 'UNKNOWN_ERR'
          else errorCode = 'SERVER_OFFLINE'
          reject(this.buildError(errorCode))
        })
    })
    promise[CANCEL] = () => {
      xhr && xhr.abort()
    }
    return promise
  }

  /**
   * @param {!string} token
   * @param {!string} application
   * @param {!Exp} experiment
   * @param {!Project} project
   */
  constructor (experiment, project, application, token) {
    ensuresArg('In `Session` constructor, argument `experiment`', experiment, Exp)
    ensuresArg('In `Session` constructor, argument `project`', project, Project)
    ensuresArg('In `Session` constructor, argument `application`', application, String)
    ensuresArg('In `Session` constructor, argument `token`', token, String)
    this.experiment = experiment
    this.project = project
    this.application = application
    this.token = token
  }
}

export default Session
