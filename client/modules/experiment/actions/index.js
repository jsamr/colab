import {
  requireExperimentPage,
  selectTimeMode,
  setTimeLineAnnotationVisibility,
  setTimeLineTasksVisibilty,
  setTimeLineZoom,
  setTimeLineTasksType,
  requestMediaNodePlacesRefresh,
  setTimeLineVisibility,
  setTimeLineCursor,
  setMenuTab,
  selectSource
} from './actionsCreators'

const experiments = {
  requireExpPage ({ Store }, experiment) {
    Store.dispatch(requireExperimentPage(experiment))
  },
  selectTimeMode ({ Store }, timeMode, experiment) {
    Store.dispatch(selectTimeMode(timeMode, experiment))
  },
  setTimeLineAnnotationsVisibility ({ Store }, visibility, experiment) {
    Store.dispatch(setTimeLineAnnotationVisibility(visibility, experiment))
  },
  setTimeLineTasksVisibility ({ Store }, visibility, experiment) {
    Store.dispatch(setTimeLineTasksVisibilty(visibility, experiment))
  },
  setTimeLineZoom ({ Store }, zoom, experiment) {
    Store.dispatch(setTimeLineZoom(zoom, experiment))
  },
  setTasksType ({ Store }, taskType, experiment) {
    Store.dispatch(setTimeLineTasksType(taskType, experiment))
  },
  setTimeLineVisibility ({ Store }, visibility, experiment) {
    Store.dispatch(setTimeLineVisibility(visibility, experiment))
  },
  setTimeLineCursor ({ Store }, cursor, experiment) {
    Store.dispatch(setTimeLineCursor(cursor, experiment))
  },
  selectMenuTab ({ Store }, menuTab, experiment) {
    Store.dispatch(setMenuTab(menuTab, experiment))
  },
  selectSource ({ Store }, source, experiment) {
    Store.dispatch(selectSource(source, experiment))
  },
  refreshSources ({ Store }, experiment) {
    Store.dispatch(requestMediaNodePlacesRefresh(experiment))
  }
}

export {
  experiments
}
