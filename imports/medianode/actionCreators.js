import { createAction } from 'redux-actions'
import { AUTH_FAIL, AUTH_OK, AUTH, RESET, REQUEST_AUTO_AUTH, INVALIDATE_AUTH } from './actionsTypes'

const requestAuth = createAction(AUTH)
const reportAuthOk = createAction(AUTH_OK)
const reportAuthFail = createAction(AUTH_FAIL)
const reset = createAction(RESET)
const requestAutoAuth = createAction(REQUEST_AUTO_AUTH)
const invalidateAuth = createAction(INVALIDATE_AUTH)

export {
  requestAuth,
  reportAuthOk,
  reportAuthFail,
  reset,
  requestAutoAuth,
  invalidateAuth
}
