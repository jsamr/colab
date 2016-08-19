import { WINDOW_HEIGHT_UPDATE, WINDOW_WIDTH_UPDATE, TOPBAR_HEIGHT_UPDATE } from './actions/actionsTypes.js'
import { TOPBAR_BASE_HEIGHT, TOPBAR_BOTTOM_BORDER_WIDTH } from '/client/configs/configuration'
import { handleActions } from 'redux-actions'
import merge from 'lodash/merge'

const defaultState = {
  height: 0,
  width: 0,
  mainHeight: 0,
  topBarHeight: TOPBAR_BASE_HEIGHT
}

const window = handleActions({
  [WINDOW_HEIGHT_UPDATE]: (state, { payload }) => merge({}, state, { height: payload, mainHeight: payload - state.topBarHeight - TOPBAR_BOTTOM_BORDER_WIDTH }),
  [WINDOW_WIDTH_UPDATE]: (state, { payload }) => merge({}, state, { width: payload }),
  [TOPBAR_HEIGHT_UPDATE]: (state, { payload }) => merge({}, state, { topBarHeight: payload })
}, defaultState)

export {
  window
}
