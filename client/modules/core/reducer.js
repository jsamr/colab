import { WINDOW_HEIGHT_UPDATE, WINDOW_WIDTH_UPDATE } from './actions/actionsTypes.js'
import { handleActions } from 'redux-actions'
import merge from 'lodash/merge'

const defaultState = {
  height: 0,
  width: 0,
  mainHeight: 0,
  // TODO bind height to muiTheme.appBar.height
  topBarHeight: 64
}

const window = handleActions({
  [WINDOW_HEIGHT_UPDATE]: (state, { payload }) => merge({}, state, { height: payload, mainHeight: payload - state.topBarHeight }),
  [WINDOW_WIDTH_UPDATE]: (state, { payload }) => merge({}, state, { width: payload })
}, defaultState)

export {
  window
}
