import { WINDOW_HEIGHT_UPDATE, WINDOW_WIDTH_UPDATE } from './actions/actionTypes.js'

const defaultState = {
  height: 0,
  width: 0
}

export function window (state = defaultState, action) {
  switch (action.type) {
    case WINDOW_HEIGHT_UPDATE:
      return Object.assign({}, state, { height: action.height })
    case WINDOW_WIDTH_UPDATE:
      return Object.assign({}, state, { width: action.width })
    default:
      return state
  }
}
