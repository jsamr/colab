import { PropTypes } from 'react'
import ExperimentsList from '../components/ExperimentsList'
import { composeWithTracker, composeAll } from 'react-komposer'
import { useDeps } from 'mantra-core'

function trackExps ({ context, project, filter }, onData) {
  let { Meteor } = context()
  if (project && Meteor.subscribe('experiments.by-project-id', project._id).ready()) {
    const experiments = project.getExperiments({ name: new RegExp(filter, 'i') }).fetch()
    onData(null, { experiments: experiments, loading: false })
  } else {
    onData(null, { loading: true })
  }
}

const ExperimentsListContainer = composeAll(
  composeWithTracker(trackExps),
  useDeps()
)(ExperimentsList)

export default ExperimentsListContainer