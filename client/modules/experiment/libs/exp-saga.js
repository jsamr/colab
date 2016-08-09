import { put, call, take, fork, cancel, select } from 'redux-saga/effects'
import { REQUIRE_EXPERIMENT_PAGE, TIME_LINE_SET_CURSOR, SET_MEDIA_NODE_PLACES, SELECT_SOURCE, REFRESH_MEDIA_NODE_PLACES } from '../actions/actionsTypes'
import { reportMediaNodePlaces, selectSource, setTimeLineCursor } from '../actions/actionsCreators'
import { AUTO_UPDATE_PLAYER_LOAD_STATUS, VIDEO_LOAD_URL } from '../../video/actions/actionsTypes'
import { requestVideoClear, requestVideoLoadUrl } from '../../video/actions/actionsCreators'
import { AUTH_OK, AUTH_FAIL, AUTH } from '/imports/medianode/actionsTypes'
import create from 'lodash/create'
import keyBy from 'lodash/keyBy'

function wrapPlaces (places, fetchUrl) {
  const placeProto = {
    get url () {
      return fetchUrl(this.place)
    }
  }
  return (places || []).map((place) => create(placeProto, place))
}

function * selectSourceLoop (placesUrlMap) {
  const { payload } = yield take(SELECT_SOURCE)
  const { url } = placesUrlMap[payload]
  if (url) yield put(requestVideoLoadUrl(url))
  yield call(selectSourceLoop, placesUrlMap)
}

function * mediaFlow (experiment, context, token) {
  let mediaLoopTask = null
  const { CONF } = context
  const appName = CONF.MEDIA_NODE_APP_NAME
  try {
    const session = experiment.createSession(appName, token)
    while (true) {
      if (mediaLoopTask) yield cancel(mediaLoopTask)
      try {
        const places = yield call([session, session.requirePlaces])
        const placesUrlMap = keyBy(wrapPlaces(places, (place) => session.buildPlaceUrl(place)), 'place')
        yield put(reportMediaNodePlaces(places, experiment))
        let defaultSource = yield select(({ experiments }) => experiments[experiment._id].source)
        if (!defaultSource && places.length > 0) defaultSource = places[0].place
        mediaLoopTask = yield fork(selectSourceLoop, placesUrlMap)
        if (defaultSource) yield put(selectSource(defaultSource, experiment))
      } catch (e) {
        yield put({ type: SET_MEDIA_NODE_PLACES, payload: e, error: true, meta: { experiment } })
      } finally {
        let shallRun = true
        while (shallRun) {
          const { meta } = yield take(REFRESH_MEDIA_NODE_PLACES)
          if (meta.experiment._id === experiment._id) shallRun = false
        }
        yield put(requestVideoClear())
      }
    }
  } finally {
    // clear video information when leaving the page
    yield put(requestVideoClear())
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
      yield put(setTimeLineCursor(cursorSec / 60, experiment))
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
      if (mediaFlowTask) yield cancel(mediaFlowTask)
      mediaFlowTask = yield fork(mediaFlow, experiment, context, token)
    }
    let { type, payload } = yield take([AUTH_OK, REQUIRE_EXPERIMENT_PAGE])
    if (type === AUTH_OK) token = payload
    else experiment = payload
    yield call(oneExpCycle)
  }
  yield call(oneExpCycle)
}

function * expFlow (context) {
  let cursorFlowTask = null
  function * oneExpCycle () {
    const { payload } = yield take(REQUIRE_EXPERIMENT_PAGE)
    const experiment = payload
    if (cursorFlowTask) yield cancel(cursorFlowTask)
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
