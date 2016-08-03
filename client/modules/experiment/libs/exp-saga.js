import { put, call, take, fork, cancel } from 'redux-saga/effects'
import { REQUIRE_EXPERIMENT_PAGE, TIME_LINE_SET_CURSOR } from '../actions/actionsTypes'
import { AUTO_UPDATE_PLAYER_LOAD_STATUS } from '../../video/actions/actionsTypes'

function * cursorFlow (experiment, context) {
  let oldCursor = 0
  const { CONF } = context
  function * oneRound () {
    let { payload } = yield take(AUTO_UPDATE_PLAYER_LOAD_STATUS)
    const { cursorSec } = payload
    if (Math.abs(cursorSec - oldCursor) > CONF.SECONDS_BETWEEN_TIME_LINE_UPDATED) {
      oldCursor = cursorSec
      yield put({
        type: TIME_LINE_SET_CURSOR,
        payload: {
          _id: experiment._id,
          cursor: cursorSec / 60
        }
      })
    }
    yield call(oneRound)
  }
  yield call(oneRound)
}

function * expFlow (context) {
  let cursorFlowTask = null
  function * oneExpCycle () {
    const { payload } = yield take(REQUIRE_EXPERIMENT_PAGE)
    if (cursorFlowTask) cancel(cursorFlowTask)
    cursorFlowTask = yield fork(cursorFlow, payload, context)
    yield call(oneExpCycle)
  }
  yield call(oneExpCycle)
}

export default function * expSaga (context) {
  yield * expFlow(context)
}
