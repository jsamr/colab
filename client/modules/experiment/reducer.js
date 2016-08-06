import {
  REQUIRE_EXPERIMENT_PAGE,
  SELECT_TIME_MODE,
  TIME_LINE_ADD_ANNOTATION,
  TIME_LINE_SET_ANNOTATIONS_VISIBILITY,
  TIME_LINE_SET_TASKS_TYPE,
  TIME_LINE_SET_TASKS_VISIBILITY,
  TIME_LINE_SET_ZOOM,
  TIME_LINE_SET_VISIBILITY,
  TIME_LINE_SET_CURSOR,
  SET_MEDIA_NODE_PLACES,
  REFRESH_MEDIA_NODE_PLACES,
  SELECT_SOURCE,
  MENU_SET_TAB
} from './actions/actionsTypes'
import merge from 'lodash/merge'
import pick from 'lodash/pick'
import { enforceInInterval } from '/imports/math'
import { ABSOLUTE_TIME_MODE } from './libs/time-modes'
import { CONCRETE_TASK_VIEW_MODE } from './libs/task-view-modes'

function updateExperimentControl(state, { _id, ...controlsToMerge }, controlNames = []) {
  if (_id == null) throw new TypeError('Missing `_id` argument in experiment reducer')
  const toMerge = pick(controlsToMerge, controlNames)
  return { ...state, [_id]: merge({}, state[_id], { controls: toMerge }) }
}

const defaultControlsState = {
  displayTasks: true,
  displayAnnotations: true,
  zoom: 1,
  cursor: 0,
  timeMode: ABSOLUTE_TIME_MODE,
  taskType: CONCRETE_TASK_VIEW_MODE,
  timeLineVisible: true
}

const defaultState = {
  controls: defaultControlsState,
  places: null,
  placesError: null,
  menuTab: 'sources',
  source: null
}

export function experiments (state = {}, { type, payload = {}, error = false, meta = {} }) {
  const { _id } = payload
  let id
  switch (type) {
    case SELECT_TIME_MODE:
      return updateExperimentControl(state, payload, 'timeMode')
    case REQUIRE_EXPERIMENT_PAGE:
      return { ...state, [_id]: merge({}, defaultState, state[_id]) }
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
    case SET_MEDIA_NODE_PLACES:
      id = meta.experiment._id
      if (error) {
        return { ...state, [id]: merge({}, state[id], { places: [], placesError: payload }) }
      } else {
        const { places } = payload
        return { ...state, [id]: merge({}, state[id], { places, placesError: null }) }
      }
    case REFRESH_MEDIA_NODE_PLACES:
      id = meta.experiment._id
      return { ...state, [id]: merge({}, state[id], { places: null, placesError: null }) }
    case SELECT_SOURCE:
      const { source } = payload
      return { ...state, [_id]: merge({}, state[_id], { source }) }
    case MENU_SET_TAB:
      const { menuTab } = payload
      return { ...state, [_id]: merge({}, state[_id], { menuTab }) }
    default: return state
  }
}