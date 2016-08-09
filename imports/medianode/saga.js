import { RESET, AUTH } from './actionsTypes'
import { takeEvery } from 'redux-saga'
import { put } from 'redux-saga/effects'
import { authFlow } from './auth-saga'

function * symlinkAuth () {
  yield put({ type: AUTH })
}

function * symlinkReset () {
  yield put({ type: RESET })
}

/**
 * @param {!MediaNodeConfig} config
 */
export default function * medianodeSaga (config) {
  const watches = [ authFlow(config) ]
  const SYM_RESET_ACTION = config.SYM_RESET_ACTION
  const SYM_AUTH_ACTION = config.SYM_AUTH_ACTION
  if (SYM_AUTH_ACTION) watches.push(takeEvery(SYM_AUTH_ACTION, symlinkAuth))
  if (SYM_RESET_ACTION) watches.push(takeEvery(SYM_RESET_ACTION, symlinkReset))
  yield watches
}
