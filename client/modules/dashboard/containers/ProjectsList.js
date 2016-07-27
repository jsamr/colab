import ProjectsList from '../components/ProjectsList'
import { composeWithTracker } from 'react-komposer'
import { useDeps, composeAll } from 'mantra-core'
import { connect } from 'react-redux'
import map from 'lodash/map'

function composer ({ context, user, selectProject, fetchOwnProjects }, onData) {
  const { Meteor, Store } = context()
  if (Meteor.subscribe('projects').ready()) {
    const projects = user.hisProjects()
    const retrievedProjectId = Store.getState().dashboard.projectId
    const fallbackProjectId = projects.length ? projects[0]._id : null
    fetchOwnProjects(map(projects, '_id'))
    selectProject(retrievedProjectId || fallbackProjectId)
    onData(null, { projects: projects, loading: false })
  } else onData(null, { loading: true })
}

const mapActions = (context, actions) => ({
  selectProject: actions.projects.select,
  fetchOwnProjects: actions.projects.fetchOwn,
  context: () => context
})

function mapOwnProjects ({ dashboard }) {
  return {
    selectedProjectId: dashboard.projectId
  }
}

export default composeAll(
  connect(mapOwnProjects),
  composeWithTracker(composer),
  useDeps(mapActions)
)(ProjectsList)
