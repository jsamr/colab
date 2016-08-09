import { createAction } from 'redux-actions'

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
  MENU_SET_TAB,
  SELECT_SOURCE,
  SET_MEDIA_NODE_PLACES,
  REFRESH_MEDIA_NODE_PLACES
} from './actionsTypes'

const identity = (arg) => arg
const metaExperiment = (arg, experiment) => ({ experiment: experiment || arg })
const createActionInExperiment = (ACTION) => createAction(ACTION, identity, metaExperiment)

const requireExperimentPage = createAction(REQUIRE_EXPERIMENT_PAGE)

const selectTimeMode = createActionInExperiment(SELECT_TIME_MODE)
const addTimeLineAnnotation = createActionInExperiment(TIME_LINE_ADD_ANNOTATION)
const setTimeLineAnnotationVisibility = createActionInExperiment(TIME_LINE_SET_ANNOTATIONS_VISIBILITY)
const setTimeLineTasksType = createActionInExperiment(TIME_LINE_SET_TASKS_TYPE)
const setTimeLineTasksVisibilty = createActionInExperiment(TIME_LINE_SET_TASKS_VISIBILITY)
const setTimeLineZoom = createActionInExperiment(TIME_LINE_SET_ZOOM)
const setTimeLineVisibility = createActionInExperiment(TIME_LINE_SET_VISIBILITY)
const setTimeLineCursor = createActionInExperiment(TIME_LINE_SET_CURSOR)
const setMenuTab = createActionInExperiment(MENU_SET_TAB)
const selectSource = createActionInExperiment(SELECT_SOURCE)
const reportMediaNodePlaces = createActionInExperiment(SET_MEDIA_NODE_PLACES)
const requestMediaNodePlacesRefresh = createActionInExperiment(REFRESH_MEDIA_NODE_PLACES)

export {
  requireExperimentPage,
  selectTimeMode,
  addTimeLineAnnotation,
  setTimeLineAnnotationVisibility,
  setTimeLineTasksType,
  setTimeLineTasksVisibilty,
  setTimeLineZoom,
  setTimeLineVisibility,
  setTimeLineCursor,
  setMenuTab,
  selectSource,
  reportMediaNodePlaces,
  requestMediaNodePlacesRefresh
}
