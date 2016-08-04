import { WINDOW_HEIGHT_UPDATE, WINDOW_WIDTH_UPDATE } from './actions/actionTypes.js'
import merge from 'lodash/merge'
const defaultState = {
  height: 0,
  width: 0,
  mainHeight: 0,
  // TODO bind height to muiTheme.appBar.height
  topBarHeight: 64
}

export function window (state = defaultState, { height, width, type }) {
  switch (type) {
    case WINDOW_HEIGHT_UPDATE:
      return merge({}, state, { height: height, mainHeight: height - state.topBarHeight })
    case WINDOW_WIDTH_UPDATE:
      return merge({}, state, { width: width })
    default:
      return state
  }
}
