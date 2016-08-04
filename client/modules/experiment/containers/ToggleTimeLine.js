import ToggleTimeLine from '../components/ToggleTimeLine'
import { useDeps } from 'mantra-core'
import { composeAll } from 'react-komposer'
import { connect } from 'react-redux'

function mapProps (state, { actions, experiment }) {
  let { setTimeLineVisibility } = actions().experiments
  let { timeLineVisible } = state.experiments[experiment._id].controls
  return {
    setTimeLineVisibility: (visibility) => setTimeLineVisibility(visibility, experiment),
    timeLineVisible
  }
}

export default composeAll(
  connect(mapProps),
  useDeps()
)(ToggleTimeLine)

