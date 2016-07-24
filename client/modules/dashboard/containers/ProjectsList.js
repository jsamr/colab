import Project from '/imports/api/Project'
import ProjectsList from '../components/ProjectsList'
import { composeWithTracker } from 'react-komposer'
import { useDeps, composeAll, compose } from 'mantra-core'
import SimpleLoading from '/imports/ui/SimpleLoading'
import { connect } from 'react-redux'
import { selectProject } from '../actions'
import head from 'lodash/head'

const composer = function ({ context }, onData) {
  const { Meteor, Store } = context()
  if (Meteor.subscribe('projects').ready()) {
    const projects = Project.find().fetch()
    Store.dispatch(selectProject(head(projects) || null))
    onData(null, { projects: projects })
  }
}

function mapSelectAction (dispatch) {
  return {
    selectProject: (project) => dispatch(selectProject(project))
  }
}

function mapSelectedProject ({ dashboard }) {
  return {
    selectedProject: dashboard.project
  }
}

export default composeAll(
  composeWithTracker(composer, SimpleLoading),
  useDeps()
)(connect(mapSelectedProject, mapSelectAction, null, { pure: false })(ProjectsList))
