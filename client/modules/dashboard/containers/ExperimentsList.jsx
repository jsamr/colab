import ExperimentsList from '../components/ExperimentsList'
import { composeWithTracker, composeAll } from 'react-komposer'
import { useDeps } from 'mantra-core'
import SimpleLoading from '/imports/ui/SimpleLoading'

function trackExps  ({ context, project }, onData) {
  let { Meteor } = context()
  if (project && Meteor.subscribe('experiments.by-project-id', project._id)) {
    onData(null, { experiments: project.getExperiments().fetch() })
  }
}

export default composeAll(
  composeWithTracker(trackExps, SimpleLoading),
  useDeps()
)(ExperimentsList)
