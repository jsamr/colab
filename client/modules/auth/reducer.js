import { LOGIN, LOGOUT, UPDATE_PROFILE } from './actions/actionTypes'

function getDefaultState () {
  return {
    // instance of CurrentUser
    user: null,
    id: null
  }
}

export function auth (state = getDefaultState(), action) {
  switch (action.type) {
    case UPDATE_PROFILE: return { ...state, ...action.payload }
    case LOGIN:
      return action.payload
    case LOGOUT:
      return getDefaultState()
    default:
      return state
  }
}
