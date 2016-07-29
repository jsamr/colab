import { put, call, take } from 'redux-saga/effects'
import { LOGIN, LOGOUT, UPDATE_PROFILE } from '../actions/actionTypes'

function * authFlow () {
  function * oneRound () {
    let logout = false
    let login = false
    while (!login) {
      let { user } = yield take(UPDATE_PROFILE)
      if (user) {
        yield put({ type: LOGIN, payload: { user, id: user._id } })
        login = true
      }
    }
    while (!logout) {
      let { user } = yield take(UPDATE_PROFILE)
      if (user == null) {
        yield put({ type: LOGOUT })
        logout = true
      }
    }
    yield call(oneRound)
  }
  yield call(oneRound)
}

export default function * authSaga (context) {
  yield * authFlow(context)
}
