import TimeLine from '../components/TimeLine'
import { composeWithTracker, composeAll } from 'react-komposer'
import { useDeps } from 'mantra-core'
import { connect } from 'react-redux'
import Annotation from '/imports/api/Annotation'
import Task from '/imports/api/Task'

function trackExperiment ({ context, project, experiment }, onData) {
  let { Meteor } = context()
  if (project && experiment) {
    const taksSub = Meteor.subscribe('plugins.tasks', experiment.name, project._id)
    const annotationsSub = Meteor.subscribe('plugins.annotations', experiment.name, project._id)
    if (taksSub.ready() && annotationsSub.ready) {
      const annotations = Annotation.find().fetch()
      const tasks = Task.find().fetch()
      onData(null, { loading: false, annotations, tasks })
    } else onData(null, { loading: true })
  } else onData(null, { loading: true })
}

export default composeAll(
  composeWithTracker(trackExperiment),
  useDeps()
)(TimeLine)
