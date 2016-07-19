import { LOGIN, LOGOUT } from '../actions/actionTypes'

function getDefaultState () {
  return {
    user: null,
    id: null
  }
}

export function auth (state = getDefaultState(), action) {
  switch (action.type) {
    case LOGIN:
      console.info('yo logging in')
      return action.value
    case LOGOUT:
      return getDefaultState()
    default:
      return state
  }
}
