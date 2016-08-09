import { createAction } from 'redux-actions'
import { LOGIN, LOGOUT, UPDATE_PROFILE } from './actionsTypes'

const reportLogin = createAction(LOGIN)
const reportProfileUpdate = createAction(UPDATE_PROFILE, (user) => ({ user, _id: user && user._id }))
const reportLogout = createAction(LOGOUT)

export {
  reportLogin,
  reportProfileUpdate,
  reportLogout
}
