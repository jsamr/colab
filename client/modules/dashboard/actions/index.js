import { DASHBOARD_SELECT_PROJECT } from './actionsTypes'

export function selectProject (project) {
  return {
    type: DASHBOARD_SELECT_PROJECT,
    project
  }
}
