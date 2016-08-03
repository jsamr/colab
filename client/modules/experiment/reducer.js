import {
  REQUIRE_EXPERIMENT_PAGE,
  SELECT_TIME_MODE,
  TIME_LINE_ADD_ANNOTATION,
  TIME_LINE_SET_ANNOTATIONS_VISIBILITY,
  TIME_LINE_SET_TASKS_TYPE,
  TIME_LINE_SET_TASKS_VISIBILITY,
  TIME_LINE_SET_ZOOM,
  TIME_LINE_SET_VISIBILITY,
  TIME_LINE_SET_CURSOR
} from './actions/actionsTypes'
import merge from 'lodash/merge'
import pick from 'lodash/pick'
import { enforceInInterval } from '/imports/math'
import { ABSOLUTE_TIME_MODE } from './libs/time-modes'
import { CONCRETE_TASK_VIEW_MODE } from './libs/task-view-modes'

function updateExperimentControl(state, { _id, ...controlsToMerge }, controlNames = [] )  {
  const toMerge = pick(controlsToMerge, controlNames)
  return { ...state, [_id]: merge({}, state[_id], { controls: toMerge }) }
}

const defaultExpState = {
  displayTasks: true,
  displayAnnotations: true,
  zoom: 1,
  cursor: 0,
  timeMode: ABSOLUTE_TIME_MODE,
  taskType: CONCRETE_TASK_VIEW_MODE,
  timeLineVisible: true
}

export function experiments (state = {}, { type, payload = {} }) {
  const { _id } = payload
  switch (type) {
    case SELECT_TIME_MODE:
      return updateExperimentControl(state, payload, 'timeMode')
    case REQUIRE_EXPERIMENT_PAGE:
      return { ...state, [_id]: merge({}, { controls: defaultExpState }, state[_id]) }
    case TIME_LINE_ADD_ANNOTATION:
      return state
    case TIME_LINE_SET_ANNOTATIONS_VISIBILITY:
      return updateExperimentControl(state, payload, 'displayAnnotations')
    case TIME_LINE_SET_TASKS_VISIBILITY:
      return updateExperimentControl(state, payload, 'displayTasks')
    case TIME_LINE_SET_TASKS_TYPE:
      return updateExperimentControl(state, payload, 'taskType')
    case TIME_LINE_SET_ZOOM:
      payload.zoom = enforceInInterval(payload.zoom, 1, 20)
      return updateExperimentControl(state, payload, 'zoom')
    case TIME_LINE_SET_VISIBILITY:
      return updateExperimentControl(state, payload, 'timeLineVisible')
    case TIME_LINE_SET_CURSOR:
      return updateExperimentControl(state, payload, 'cursor')
    default: return state
  }
}