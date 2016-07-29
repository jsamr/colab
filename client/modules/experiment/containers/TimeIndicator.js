import TimeIndicator from '../components/TimeIndicator'
import { useDeps } from 'mantra-core'
import { composeAll } from 'react-komposer'
import { connect } from 'react-redux'

function mapProps (state, { actions, experiment }) {
  let { selectTimeMode } = actions().experiments
  let { timeMode, cursor } = state.experiments[experiment._id].controls
  return {
    selectTimeMode: (mode) => selectTimeMode(mode, experiment),
    timeMode,
    cursor
  }
}

export default composeAll(
  connect(mapProps),
  useDeps()
)(TimeIndicator)
