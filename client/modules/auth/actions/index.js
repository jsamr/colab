import { LOGIN, LOGOUT, UPDATE_PROFILE } from './actionTypes'

function login ({ Store }, value) {
  Store.dispatch({ type: LOGIN, payload: value })
}

function update ({ Store }, user) {
  Store.dispatch({ type: UPDATE_PROFILE, payload: { user, _id: user && user._id } })
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

