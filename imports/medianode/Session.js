import { CANCEL } from 'redux-saga'
import { getConfig } from '/imports/api/Config'
import { asyncGet } from './async'
import isString from 'lodash/isString'
import errors from './server-errors'
import url from 'url'
import autobind from 'autobind-decorator'
import { ensuresArg } from '/imports/ensure'
import Exp from '/imports/api/Exp'
import Project from '/imports/api/Project'

@autobind
class Session {

  buildRequesPlacesUrl () {
    const config = getConfig()
    return url.resolve(config.videoServer.url, `/i/${this.project.acronym}/${this.experiment.name}`)
  }

  buildPlaceUrl (place) {
    const config = getConfig()
    const a = this.application
    const t = this.token
    return url.resolve(config.videoServer.url, `/m/${this.project.acronym}/${this.experiment.name}/${place}?a=${a}&t=${t}`)
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
            this.placesError = errors[data] || errors.UNKNOWN_ERR
            reject(this.placesError)
          } else {
            resolve(data.places)
          }
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            this.placesError = errors[error.response.data] || errors.UNKNOWN_ERR
          } else {
            this.placesError = errors.SERVER_OFFLINE
          }
          reject(this.placesError)
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
