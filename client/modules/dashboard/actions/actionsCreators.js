import { createAction } from 'redux-actions'
import zipObject from 'lodash/zipObject'
import map from 'lodash/map'
const emptyPojoBuilder = () => ({})

import {
  DASHBOARD_SELECT_PROJECT,
  DASHBOARD_FETCH_OWN_PROJECTS,
  DASHBOARD_SET_EXPS_FILTER
} from './actionsTypes'

const selectProject = createAction(DASHBOARD_SELECT_PROJECT)
const fetchOwnProjects = createAction(DASHBOARD_FETCH_OWN_PROJECTS, (ownProjectsIds) => zipObject(ownProjectsIds, map(ownProjectsIds, emptyPojoBuilder)))
const setExpFilter = createAction(DASHBOARD_SET_EXPS_FILTER, (projectId, filter) => ({ projectId, filter }))

export {
  selectProject,
  fetchOwnProjects,
  setExpFilter
}
