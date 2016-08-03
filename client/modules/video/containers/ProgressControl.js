import ProgressControl from '../components/ProgressControl'
import { connect } from 'react-redux'
import { useDeps } from 'mantra-core'
import { composeAll } from 'react-komposer'

function mapProps (state) {
  return state.video
}

function mapDeps (context, actions) {
  return {
    userSelectPlayerCursor: actions.video.userSelectPlayerCursor
  }
}

export default composeAll(
  connect(mapProps),
  useDeps(mapDeps)
)(ProgressControl)
