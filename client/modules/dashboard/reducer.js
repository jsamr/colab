import {
  DASHBOARD_SELECT_PROJECT,
  DASHBOARD_FETCH_OWN_PROJECTS,
  DASHBOARD_SET_EXPS_FILTER
} from './actions/actionsTypes'
import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import merge from 'lodash/merge'

const projectId = handleActions({
  [DASHBOARD_SELECT_PROJECT]: (state, { payload }) => payload
}, null)

const ownProjects = handleActions({
  [DASHBOARD_FETCH_OWN_PROJECTS]: (state, { payload }) => merge({}, state, payload),
  [DASHBOARD_SET_EXPS_FILTER]: (state, { payload }) => {
    const { filter, projectId } = payload
    return merge({}, state, { [projectId]: { filter } })
  }
}, {})

const dashboard = combineReducers({
  projectId,
  ownProjects
})

export {
  dashboard
}
