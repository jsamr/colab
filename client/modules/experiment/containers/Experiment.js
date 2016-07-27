import Experiment from '../components/Experiment'
import { composeWithTracker, composeAll } from 'react-komposer'
import { useDeps } from 'mantra-core'
import { connect } from 'react-redux'
import Exp from '/imports/api/Exp'
import Project from '/imports/api/Project'

function trackExperiment ({ context, params }, onData) {
  let { Meteor } = context()
  const { projectAcronym, experimentName } = params
  const projectSub = Meteor.subscribe('project.by-acronym', projectAcronym)
  if (projectSub.ready()) {
    const project = Project.findOne({ acronym: projectAcronym })
    if (!project) onData(null, { experiment: null, project: null, loading: false })
    else if (Meteor.subscribe('experiment.by-name', experimentName, project._id).ready()) {
      const experiment = Exp.findOne({ name: experimentName })
      onData(null, { experiment, project, loading: false })
    } else onData(null, { loading: true })
  } else onData(null, { loading: true })
}

const mapStateToProps = (state) => {
  return {
    height: state.window.mainHeight
  }
}

export default composeAll(
  connect(mapStateToProps),
  composeWithTracker(trackExperiment),
  useDeps()
)(Experiment)

export {
  trackExperiment
}