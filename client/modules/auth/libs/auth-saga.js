import { put, call, take } from 'redux-saga/effects'
import { LOGIN, LOGOUT, UPDATE_PROFILE } from '../actions/actionTypes'
import { push } from 'react-router-redux'

function * authFlow ({ ROUTES }) {
  function * oneRound () {
    let logout = false
    let login = false
    while (!login) {
      let { user } = yield take(UPDATE_PROFILE)
      if (user) {
        yield put({ type: LOGIN, value: { user, id: user._id } })
        yield put(push(ROUTES.HOME))
        login = true
      }
    }
    while (!logout) {
      let { user } = yield take(UPDATE_PROFILE)
      console.info('USER AUTH', user)
      if (user == null) {
        yield put({ type: LOGOUT })
        yield put(push(ROUTES.LOGIN))
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
