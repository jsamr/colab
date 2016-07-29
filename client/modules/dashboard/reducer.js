import {
  DASHBOARD_SELECT_PROJECT,
  DASHBOARD_FETCH_OWN_PROJECTS,
  DASHBOARD_SET_EXPS_FILTER
} from './actions/actionsTypes'
import merge from 'lodash/merge'
import { combineReducers } from 'redux'

function projectId (state = null, { payload, type }) {
  switch (type) {
    case DASHBOARD_SELECT_PROJECT:
      return payload
    default:
      return state
  }
}

function ownProjects (state = {}, { payload, type }) {
  switch (type) {
    // TODO support removal of abandonned projects
    case DASHBOARD_FETCH_OWN_PROJECTS: return merge({}, state, payload)
    case DASHBOARD_SET_EXPS_FILTER:
      const { filter, projectId } = payload
      return merge({}, state, { [projectId]: { filter } })
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
