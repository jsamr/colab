import pull from 'lodash/pull'
import { put, call, take } from 'redux-saga/effects'
import { START_MEDIA_NODE_AUTH, NOTIFY_SUBSCRIPTION_READY } from '../actions/actionTypes'
import { LOGIN, LOGOUT } from '/client/modules/auth/actions/actionTypes'

function pushIfNoExists (array, value) {
  if (array.indexOf(value) === -1) array.push(value)
}

function * syncFlow () {
  const actions = []
  function * oneRound () {
    let action = yield take([ LOGIN, NOTIFY_SUBSCRIPTION_READY ])
    pushIfNoExists(actions, action)
    if (actions.length === 2) {
      yield put({ type: START_MEDIA_NODE_AUTH })
      yield take(LOGOUT)
      pull(actions, LOGIN)
    }
    yield call(oneRound)
  }
  yield call(oneRound)
}

export default function * syncSaga (config) {
  yield * syncFlow()
}
