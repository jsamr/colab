import { LOGIN, LOGOUT } from './actionTypes'

export function login (value) {
  return { type: LOGIN, value }
}

export function logout () {
  return { type: LOGOUT }
}

