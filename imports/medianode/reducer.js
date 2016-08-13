import merge from 'lodash/merge'

import { RESET, AUTH, AUTH_FAIL, AUTH_OK, INVALIDATE_AUTH } from './actionsTypes'

function getDefaultState () {
  return {
    error: null,
    valid: false,
    pending: false,
    token: null
  }
}

export function media (state, action) {
  if (state === undefined) return getDefaultState()
  const { payload } = action
  switch (action.type) {
    case AUTH:
      return merge({}, state, { pending: true })
    case INVALIDATE_AUTH:
    case AUTH_FAIL:
      return merge({}, state, { pending: false, valid: false, error: payload, token: null })
    case AUTH_OK:
      return merge({}, state, { pending: false, valid: true, error: null, token: payload || state.token })
    case RESET:
      return getDefaultState()
    default:
      return state
  }
}
