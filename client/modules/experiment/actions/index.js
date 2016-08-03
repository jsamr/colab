import {
  REQUIRE_EXPERIMENT_PAGE,
  SELECT_TIME_MODE,
  TIME_LINE_ADD_ANNOTATION,
  TIME_LINE_SET_ANNOTATIONS_VISIBILITY,
  TIME_LINE_SET_TASKS_VISIBILITY,
  TIME_LINE_SET_ZOOM,
  TIME_LINE_SET_TASKS_TYPE,
  TIME_LINE_SET_VISIBILITY,
  TIME_LINE_SET_CURSOR
} from './actionsTypes'

const experiments = {
  requireExpPage ({ Store }, experiment) {
    Store.dispatch({
      type: REQUIRE_EXPERIMENT_PAGE,
      payload: experiment
    })
  },
  selectTimeMode ({ Store }, timeMode, experiment) {
    Store.dispatch({
      type: SELECT_TIME_MODE,
      payload: {
        timeMode,
        _id: experiment._id
      }
    })
  },
  setTimeLineAnnotationsVisibility ({ Store }, visibility, experiment) {
    Store.dispatch({
      type: TIME_LINE_SET_ANNOTATIONS_VISIBILITY,
      payload: {
        displayAnnotations: visibility,
        _id: experiment._id
      }
    })
  },
  setTimeLineTasksVisibility ({ Store }, visibility, experiment) {
    Store.dispatch({
      type: TIME_LINE_SET_TASKS_VISIBILITY,
      payload: {
        displayTasks: visibility,
        _id: experiment._id
      }
    })
  },
  setTimeLineZoom ({ Store }, zoom, experiment) {
    Store.dispatch({
      type: TIME_LINE_SET_ZOOM,
      payload: {
        zoom,
        _id: experiment._id
      }
    })
  },
  setTasksType ({ Store }, taskType, experiment) {
    Store.dispatch({
      type: TIME_LINE_SET_TASKS_TYPE,
      payload: {
        taskType,
        _id: experiment._id
      }
    })
  },
  setTimeLineVisibility ({ Store }, visibility, experiment) {
    Store.dispatch({
      type: TIME_LINE_SET_VISIBILITY,
      payload: {
        timeLineVisible: visibility,
        _id: experiment._id
      }
    })
  },
  setTimeLineCursor ({ Store }, cursor, experiment) {
    Store.dispatch({
      type: TIME_LINE_SET_CURSOR,
      payload: {
        cursor: cursor,
        _id: experiment._id
      }
    })
  }
}

export {
  experiments
}
