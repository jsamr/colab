import {
  DASHBOARD_SELECT_PROJECT,
  DASHBOARD_FETCH_OWN_PROJECTS,
  DASHBOARD_SET_EXPS_FILTER
} from './actions/actionsTypes'
import merge from 'lodash/merge'
import { combineReducers } from 'redux'

function projectId (state = null, { projectId, type }) {
  switch (type) {
    case DASHBOARD_SELECT_PROJECT:
      return projectId
    default:
      return state
  }
}

function ownProjects (state = {}, { ownProjects, projectId, filter, type }) {
  switch (type) {
    // TODO support removal of abandonned projects
    case DASHBOARD_FETCH_OWN_PROJECTS: return merge({}, state, ownProjects)
    case DASHBOARD_SET_EXPS_FILTER: return merge({}, state, { [projectId]: { filter } })
    default: return state
  }
}

const dashboard = combineReducers({
  projectId,
  ownProjects
})

export {
  dashboard
}
