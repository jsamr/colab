import { LOGIN, LOGOUT, UPDATE_PROFILE } from './actions/actionsTypes'
import { handleActions } from 'redux-actions'

const getDefaultState = () => ({ user: null, id: null })

const auth = handleActions({
  [UPDATE_PROFILE]: (state, { payload }) => ({ ...state, ...payload }),
  [LOGIN]: (state, { payload }) => payload,
  [LOGOUT]: getDefaultState
}, getDefaultState())

export {
  auth
}