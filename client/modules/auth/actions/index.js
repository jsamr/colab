import { LOGIN, LOGOUT, UPDATE_PROFILE } from './actionTypes'

export function login (value) {
  return { type: LOGIN, value }
}

export function logout () {
  return { type: LOGOUT }
}

export function update (user) {
  return { type: UPDATE_PROFILE, user }
}