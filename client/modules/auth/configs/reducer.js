import { LOGIN, LOGOUT } from '../actions/actionTypes'

function getDefaultState () {
  return {
    // instance of CurrentUser
    user: null,
    id: null
  }
}

export function auth (state = getDefaultState(), action) {
  switch (action.type) {
    case LOGIN:
      return action.value
    case LOGOUT:
      return getDefaultState()
    default:
      return state
  }
}
