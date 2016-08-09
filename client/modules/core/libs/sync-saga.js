import pull from 'lodash/pull'
import { put, call, take } from 'redux-saga/effects'
import { NOTIFY_SUBSCRIPTION_READY } from '../actions/actionsTypes'
import { requestMediaNodeAuth } from '../actions/actionsCreators'
import { LOGIN, LOGOUT } from '/client/modules/auth/actions/actionsTypes'

function pushIfNoExists (array, value) {
  if (array.indexOf(value) === -1) array.push(value)
}

function * syncFlow () {
  const actions = []
  function * oneCycle () {
    let action = yield take([ LOGIN, NOTIFY_SUBSCRIPTION_READY ])
    pushIfNoExists(actions, action.type)
    if (actions.length === 2) {
      yield put(requestMediaNodeAuth())
      yield take(LOGOUT)
      pull(actions, LOGIN)
    }
    yield call(oneCycle)
  }
  yield call(oneCycle)
}

export default function * syncSaga () {
  yield * syncFlow()
}

