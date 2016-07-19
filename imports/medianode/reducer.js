import merge from 'lodash/merge'

import { RESET, AUTH, AUTH_FAIL, AUTH_OK } from './actions'

function getDefaultState () {
  return {
    error: null,
    valid: false,
    pending: false
  }
}

export function media (state, action) {
  if (state === undefined) return getDefaultState()
  switch (action.type) {
    case AUTH:
      return merge({}, state, { pending: true })
    case AUTH_FAIL:
      return merge({}, state, { pending: false, valid: false, error: action.error })
    case AUTH_OK:
      return merge({}, state, { pending: false, valid: true, error: null, token: action.token || undefined })
    case RESET:
      return getDefaultState()
    default:
      return state
  }
}
