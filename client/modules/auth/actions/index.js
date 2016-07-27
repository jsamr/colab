import { LOGIN, LOGOUT, UPDATE_PROFILE } from './actionTypes'

function login ({ Store }, value) {
  Store.dispatch({ type: LOGIN, value })
}

function update ({ Store }, user) {
  Store.dispatch({ type: UPDATE_PROFILE, user })
}

function logout ({ Meteor }) {
  Meteor.logout()
}

const auth = {
  login,
  update,
  logout
}

export default {
  auth
}

