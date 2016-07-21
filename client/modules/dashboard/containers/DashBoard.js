import Project from '/imports/api/Project'
import DashBoard from '../components/DashBoard'
import { composeWithTracker } from 'react-komposer'
import { useDeps, composeAll } from 'mantra-core'

const composer = ( { context }, onData) => {
  const { Meteor } = context()
  if (Meteor.subscribe('projects').ready()) {
    onData(null, { projects: Project.find().fetch() })
  }
}

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(DashBoard)
