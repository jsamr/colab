import { REQUIRE_EXPERIMENT_PAGE, SELECT_TIME_MODE } from './actions/actionsTypes'
import merge from 'lodash/merge'
import { ABSOLUTE_TIME_MODE } from './libs/time-modes'

const defaultExpState = {
  displayTasks: true,
  displayAnnotations: true,
  zoom: 1,
  cursor: 0,
  timeMode: ABSOLUTE_TIME_MODE
}

export function experiments (state = {}, { type, payload = {} }) {
  const { _id } = payload
  switch (type) {
    case SELECT_TIME_MODE:
      let { timeMode } = payload
      return { ...state, [_id]: merge(state[_id], { controls: { timeMode } }) }
    case REQUIRE_EXPERIMENT_PAGE:
      return { ...state, [_id]: merge({}, { controls: defaultExpState }, state[_id]) }
    default: return state
  }
}