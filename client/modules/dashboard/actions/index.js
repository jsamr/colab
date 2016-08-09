import { selectProject, fetchOwnProjects, setExpFilter } from './actionsCreators'

const projects = {
  select ({ Store }, projectId) {
    Store.dispatch(selectProject(projectId))
  },
  fetchOwn ({ Store }, ownProjectsIds) {
    Store.dispatch(fetchOwnProjects(ownProjectsIds))
  },
  setExpsFilter ({ Store }, projectId, filter) {
    Store.dispatch(setExpFilter(projectId, filter))
  }
}

export default {
  projects
}
