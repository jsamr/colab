import ExperimentHeader from '../components/ExperimentHeader'
import { composeWithTracker, composeAll } from 'react-komposer'
import { useDeps } from 'mantra-core'
import { connect } from 'react-redux'
import Exp from '/imports/api/Exp'
import Project from '/imports/api/Project'
import { trackExperiment } from './Experiment'

const mapStateToProps = (state) => {
  return {
    height: state.window.mainHeight
  }
}

export default composeAll(
  connect(mapStateToProps),
  composeWithTracker(trackExperiment),
  useDeps()
)(ExperimentHeader)
