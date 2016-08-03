import TimeControls from '../components/TimeControls'
import { useDeps } from 'mantra-core'
import { composeAll } from 'react-komposer'
import { connect } from 'react-redux'
import partialRight from 'lodash/partialRight'

function partialize (methodNames, actions, experiment) {
  const partialObj = {}
  methodNames.forEach((methodName) => {
    partialObj[methodName] = partialRight(actions[methodName], experiment)
  })
  return partialObj
}

function mapProps ({ experiments }, { actions, experiment }) {
  return {
    controls: experiments[experiment._id].controls,
    ...partialize(['setTimeLineAnnotationsVisibility', 'setTimeLineTasksVisibility', 'setTimeLineZoom'], actions().experiments, experiment)
  }

}

export default composeAll(
  connect(mapProps),
  useDeps()
)(TimeControls)
