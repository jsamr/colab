import ProjectCard from '../components/ProjectCard'
import { setExpsFilter } from '../actions'
import { connect } from 'react-redux'
import { composeAll } from 'react-komposer'
import { useDeps } from 'mantra-core'

function mapProps (state, { actions, project }) {
  let { setExpsFilter } = actions().projects
  return {
    filter: state.dashboard.ownProjects[project._id].filter,
    selectFilter: (filter) => setExpsFilter(project._id, filter)
  }
}

export default composeAll(
  connect(mapProps),
  useDeps()
)(ProjectCard)
