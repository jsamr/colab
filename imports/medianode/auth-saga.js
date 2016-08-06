import { put, call, take, fork, cancel, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { asyncPost } from './async'
import MediaNodeConfig from './MediaNodeConfig'
import errors from './server-errors'
import { AUTH_FAIL, AUTH_OK, AUTH, RESET, REQUEST_AUTO_AUTH } from './actions'
/**
 * Automatically re-authenticate user to media-node server before token expires.
 * @param {Number} seconds, seconds after which an auth request will be triggered
 */
function * autoReAuth (seconds) {
  yield delay((seconds) * 1000)
  yield put({ type: REQUEST_AUTO_AUTH })
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
    yield put({ type: AUTH_OK, payload: data.token })
  } catch (error) {
    console.error(error)
    // TODO use a composer instead
    yield delay(1000)
    let standardError = errors.SERVER_OFFLINE
    if (error.response && error.response.data) {
      const possibleError = errors[error.response.data]
      if (possibleError) standardError = possibleError
    }
    yield put({ type: AUTH_FAIL, payload: standardError })
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
    yield put({ type: AUTH_OK })
  } catch (error) {
    console.error(error)
    let standardError = errors.SERVER_OFFLINE
    if (error.response && error.response.data) {
      const possibleError = errors[error.response.data]
      if (possibleError) standardError = possibleError
    }
    yield put({ type: AUTH_FAIL, payload: standardError })
  }
}

/**
 * @param {MediaNodeConfig} conf
 */
function * authenticate (conf) {
  if (!conf instanceof MediaNodeConfig) throw new TypeError('must provide an instance of MediaNodeConfig ')
  if (conf.canAuthWithToken()) yield fork(authenticateWithToken, conf)
  else yield fork(authenticateWithCredentials, conf)
  let action = yield take([ AUTH_OK, AUTH_FAIL ])
  if (action.type === AUTH_OK) {
    // upon success, launch a fork that will send autoreauth actions when token is about to expire
    console.info(`Reconnecting in ${conf.remainingSecondsBeforeTokenExpires()} seconds.`)
    yield fork(autoReAuth, conf.remainingSecondsBeforeTokenExpires())
  } else {
    console.warn(`Auth failed. Reconnecting in ${conf.RETRY_AFTER_SECONDS} seconds.`)
    // upon failure, launch a fork that will attempt a reauth after RETRY_AFTER_SECONDS seconds
    yield fork(autoReAuth, conf.RETRY_AFTER_SECONDS)
  }
}

export function * authFlow (conf) {
  // the recursive flow logic
  let run = function * () {
    // wait for auth event
    yield take(AUTH)
    // fork async authentication mediaserver call
    let authTask = yield fork(authenticate, conf)
    let action = yield take([ RESET, REQUEST_AUTO_AUTH ])
    yield fork(run)
    switch (action.type) {
      case RESET:
        conf.clear()
        yield cancel(authTask)
        break
      case REQUEST_AUTO_AUTH:
        yield put({ type: AUTH })
        break
    }
  }
  yield call(run)
}
