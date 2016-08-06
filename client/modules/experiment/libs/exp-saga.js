import { put, call, take, fork, cancel, select } from 'redux-saga/effects'
import { REQUIRE_EXPERIMENT_PAGE, TIME_LINE_SET_CURSOR, SET_MEDIA_NODE_PLACES, SELECT_SOURCE, REFRESH_MEDIA_NODE_PLACES } from '../actions/actionsTypes'
import { AUTO_UPDATE_PLAYER_LOAD_STATUS, VIDEO_LOAD_URL, VIDEO_CLEAR } from '../../video/actions/actionsTypes'
import { AUTH_OK, AUTH_FAIL, AUTH } from '/imports/medianode/actions'
import create from 'lodash/create'
import keyBy from 'lodash/keyBy'
import includes from 'lodash/includes'
import map from 'lodash/map'

function wrapPlaces (places, fetchUrl) {
  const placeProto = {
    get url () {
      return fetchUrl(this.place)
    }
  }
  return (places || []).map((place) => create(placeProto, place))
}

function * mediaLoop (placesUrlMap) {
  while (true) {
    const { payload } = yield take(SELECT_SOURCE)
    const { source } = payload
    const { url } = placesUrlMap[source]
    if (url) yield put({ type: VIDEO_LOAD_URL, payload: url })
  }
}

function * mediaFlow (experiment, context, token) {
  let mediaLoopTask = null
  const { CONF } = context
  const appName = CONF.MEDIA_NODE_APP_NAME
  try {
    const session = experiment.createSession(appName, token)
    while (true) {
      if (mediaLoopTask) cancel(mediaLoopTask)
      try {
        const places = yield call([session, session.requirePlaces])
        const placesUrlMap = keyBy(wrapPlaces(places, (place) => session.buildPlaceUrl(place)), 'place')
        yield put({ type: SET_MEDIA_NODE_PLACES, payload: { places }, meta: { experiment } })
        let defaultSource = yield select(({ experiments }) => experiments[experiment._id].source)
        if (!defaultSource && places.length > 0) defaultSource = places[0].place
        mediaLoopTask = yield fork(mediaLoop, placesUrlMap)
        if (defaultSource) yield put({ type: SELECT_SOURCE, payload: { source: defaultSource, _id: experiment._id } })
      } catch (e) {
        yield put({ type: SET_MEDIA_NODE_PLACES, payload: e, error: true, meta: { experiment } })
      } finally {
        yield take(REFRESH_MEDIA_NODE_PLACES)
        yield put({ type: VIDEO_CLEAR })
      }
    }
  } finally {
    // clear video information when leaving the page
    yield put({ type: VIDEO_CLEAR })
  }
}

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

function * authFlow (context) {
  let mediaFlowTask = null
  let experiment = null
  let token = null
  function * oneExpCycle () {
    if (experiment && token) {
      if (mediaFlowTask) cancel(mediaFlowTask)
      mediaFlowTask = yield fork(mediaFlow, experiment, context, token)
    }
    let { type, payload } = yield take([AUTH_OK, REQUIRE_EXPERIMENT_PAGE])
    if (type === AUTH_OK) {
      token = payload
    } else {
      experiment = payload
    }
    yield call(oneExpCycle)
  }
  yield call(oneExpCycle)
}

function * expFlow (context) {
  let cursorFlowTask = null
  function * oneExpCycle () {
    const { payload } = yield take(REQUIRE_EXPERIMENT_PAGE)
    const experiment = payload
    if (cursorFlowTask) cancel(cursorFlowTask)
    cursorFlowTask = yield fork(cursorFlow, experiment, context)
    yield call(oneExpCycle)
  }
  yield call(oneExpCycle)
}

export default function * expSaga (context) {
  yield [
    expFlow(context),
    authFlow(context)
  ]
}
