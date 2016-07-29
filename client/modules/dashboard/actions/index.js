import {
  DASHBOARD_SELECT_PROJECT,
  DASHBOARD_FETCH_OWN_PROJECTS,
  DASHBOARD_SET_EXPS_FILTER
} from './actionsTypes'
import zipObject from 'lodash/zipObject'
import map from 'lodash/map'

const emptyPojoBuilder = () => ({})

const projects = {
  select ({ Store }, projectId) {
    Store.dispatch({
      type: DASHBOARD_SELECT_PROJECT,
      payload: projectId
    })
  },
  fetchOwn ({ Store }, ownProjectsIds) {
    Store.dispatch({
      type: DASHBOARD_FETCH_OWN_PROJECTS,
      payload: zipObject(ownProjectsIds, map(ownProjectsIds, emptyPojoBuilder))
    })
  },
  setExpsFilter ({ Store }, projectId, filter) {
    Store.dispatch({
      type: DASHBOARD_SET_EXPS_FILTER,
      payload : {
        projectId,
        filter
      }
    })
  }
}

export default {
  projects
}