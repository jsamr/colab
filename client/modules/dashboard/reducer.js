import { DASHBOARD_SELECT_PROJECT } from './actions/actionsTypes'

export function dashboard (state = { project: null }, { project, type }) {
  switch (type) {
    case DASHBOARD_SELECT_PROJECT: return { ...state, project }
    default: return state
  }
}
