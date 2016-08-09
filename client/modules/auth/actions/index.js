import {
  reportLogin,
  reportProfileUpdate
} from './actionsCreators'

function login ({ Store }, value) {
  Store.dispatch(reportLogin(value))
}

function update ({ Store }, user) {
  Store.dispatch(reportProfileUpdate(user))
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

