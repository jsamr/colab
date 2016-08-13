import { put, call, take, fork, cancel, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { asyncPost } from './async'
import MediaNodeConfig from './MediaNodeConfig'
import errors from './server-errors'
import { AUTH_FAIL, AUTH_OK, AUTH, RESET, INVALIDATE_AUTH } from './actionsTypes'
import { requestAuth, reportAuthOk, reportAuthFail } from './actionCreators'
/**
 * Automatically re-authenticate user to media-node server before token expires.
 * @param {Number} seconds, seconds after which an auth request will be triggered
 */
function * autoReAuth (seconds) {
  yield delay((seconds) * 1000)
  yield put(requestAuth())
}

function * autoReauthFlow (conf) {
  function * authLoop () {
    const { type } = yield take([AUTH_FAIL, AUTH_OK])
    if (type === AUTH_FAIL) {
      console.warn(`Auth failed. Reconnecting in ${conf.RETRY_AFTER_SECONDS} seconds.`)
      yield call(autoReAuth, conf.RETRY_AFTER_SECONDS)
      yield call(authLoop)
    }
  }
  yield call(authLoop)
  yield call(autoReauthFlow, conf)
}

/**
 * Authenticate to the media-node server with custom credentials
 * @param {MediaNodeConfig} conf
 */
export function * authenticateWithCredentials (conf) {
  try {
    const state = yield select()
    let args = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      params: conf.getCredentials(state)
    }
    let result = yield call(asyncPost, conf.getRootUrl() + 'auth/c/' + conf.appName, args)
    let { data } = yield result
    conf.token = { value: data.token, epoch_s: data.epoch_s }
    // TODO use a composer instead
    yield delay(1000)
    yield put(reportAuthOk(data.token))
  } catch (error) {
    console.error(error)
    // TODO use a composer instead
    yield delay(1000)
    let standardError = errors.SERVER_OFFLINE
    if (error.response && error.response.data) {
      const possibleError = errors[error.response.data]
      if (possibleError) standardError = possibleError
    }
    yield put(reportAuthFail(new Error(standardError)))
  }
}

/**
 * Authenticate to the media-node server with token
 * @param {MediaNodeConfig} conf
 */
export function * authenticateWithToken (conf) {
  try {
    let result = yield call(asyncPost, conf.getRootUrl() + 'auth/t/' + conf.appName, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      params: {
        token: conf.token.value
      }
    })
    yield result
    yield put(reportAuthOk())
  } catch (error) {
    console.error(error)
    let standardError = errors.SERVER_OFFLINE
    if (error.response && error.response.data) {
      const possibleError = errors[error.response.data]
      if (possibleError) standardError = possibleError
    }
    yield put(reportAuthFail(new Error(standardError)))
  }
}

/**
 * @param {MediaNodeConfig} conf
 */
function * authenticate (conf) {
  let reauthTokenExpiresTask = null
  if (!conf instanceof MediaNodeConfig) throw new TypeError('must provide an instance of MediaNodeConfig ')
  if (conf.canAuthWithToken()) yield fork(authenticateWithToken, conf)
  else yield fork(authenticateWithCredentials, conf)
  let action = yield take([AUTH_OK, AUTH_FAIL])
  if (action.type === AUTH_OK) {
    console.info(`Reconnecting in ${conf.remainingSecondsBeforeTokenExpires()} seconds.`)
    reauthTokenExpiresTask = yield fork(autoReAuth, conf.remainingSecondsBeforeTokenExpires())
    yield take(AUTH)
    cancel(reauthTokenExpiresTask)
  }
}

function * authFlow (conf) {
  // the recursive flow logic
  let run = function * () {
    // wait for auth event
    yield take(AUTH)
    console.info('AUTH EVENT RECEIVED')
    // fork async authentication mediaserver call
    yield fork(authenticate, conf)
    yield call(run)
  }
  yield call(run)
}

function * resetAuthFlow (conf) {
  yield take(RESET)
  conf.clear()
  yield call(resetAuthFlow, conf)
}

function * invalidateAuthFlow (conf) {
  yield take(AUTH_OK)
  const { type, payload } = yield take([INVALIDATE_AUTH, AUTH_FAIL])
  if (type === INVALIDATE_AUTH) {
    conf.token = null
    yield put(reportAuthFail(new Error(payload)))
  }
  yield call(invalidateAuthFlow, conf)
}

export default function * authSaga (conf) {
  yield [
    autoReauthFlow(conf),
    resetAuthFlow(conf),
    invalidateAuthFlow(conf),
    authFlow(conf)
  ]
}
