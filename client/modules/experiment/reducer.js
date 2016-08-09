import { handleActions } from 'redux-actions'
import identity from 'lodash/identity'
import Exp from '/imports/api/Exp'
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
import { enforceInInterval } from '/imports/math'
import { ABSOLUTE_TIME_MODE } from './libs/time-modes'
import { CONCRETE_TASK_VIEW_MODE } from './libs/task-view-modes'

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

function reduceExperiment (reducer, errorReducer) {
  return (state, { meta, payload, error }) => {
    if (!meta.experiment instanceof Exp) throw new TypeError('Meta field `experiment` is not of type `Exp`')
    const id = meta.experiment._id
    let mergee = {}
    if (error === true && errorReducer) mergee = errorReducer(payload, error)
    else mergee = reducer(payload, error)
    return mergee ? { ...state, [id]: merge({}, state[id], mergee) } : state
  }
}

function reduceExperimentControls (fieldName) {
  return reduceExperiment((payload) => {
    return { controls: { [fieldName]: payload } }
  })
}

const reduceRequireExperimentPage = (state, { payload }) => ({ ...state, [payload._id]: merge({}, defaultState, state[payload._id]) })
const reduceSetMediaNodePlaces = reduceExperiment(
  function onSuccess (payload) {
    return { places: payload, placesError: null }
  },
  function onError (payload) {
    return { places: [], placesError: payload }
  }
)
const reduceRefreshMediaNodePlaces = reduceExperiment(() => ({ places: null, placesError: null }))
const reduceSelectSource = reduceExperiment((payload) => ({ source: payload }))
const reduceSetMenuTab = reduceExperiment((payload) => ({ menuTab: payload }))
const reduceZoom = reduceExperiment((payload) => ({ controls: { zoom: enforceInInterval(payload, 1, 20) } }))

const experiments = handleActions({
  [REQUIRE_EXPERIMENT_PAGE]: reduceRequireExperimentPage,
  [SET_MEDIA_NODE_PLACES]: reduceSetMediaNodePlaces,
  [REFRESH_MEDIA_NODE_PLACES]: reduceRefreshMediaNodePlaces,
  [SELECT_SOURCE]: reduceSelectSource,
  [MENU_SET_TAB]: reduceSetMenuTab,
  [SELECT_TIME_MODE]: reduceExperimentControls('timeMode'),
  [TIME_LINE_SET_ANNOTATIONS_VISIBILITY]: reduceExperimentControls('displayAnnotations'),
  [TIME_LINE_SET_TASKS_VISIBILITY]: reduceExperimentControls('displayTasks'),
  [TIME_LINE_SET_TASKS_TYPE]: reduceExperimentControls('taskType'),
  [TIME_LINE_SET_ZOOM]: reduceZoom,
  [TIME_LINE_SET_VISIBILITY]: reduceExperimentControls('timeLineVisible'),
  [TIME_LINE_SET_CURSOR]: reduceExperimentControls('cursor'),
  [TIME_LINE_ADD_ANNOTATION]: identity
}, {})

export {
  experiments
}