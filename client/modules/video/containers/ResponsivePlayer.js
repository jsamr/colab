import ResponsivePlayer from '../components/ResponsivePlayer'
import { connect } from 'react-redux'
import { useDeps } from 'mantra-core'
import { composeAll } from 'react-komposer'

function mapActions (context, actions) {
  return {
    autoUpdateCursor: actions.video.autoUpdatePlayerLoadStatus,
    autoUpdateDuration: actions.video.autoUpdatePlayerDuration,
    setPlayingState: actions.video.setPlayingState
  }
}

function mapState (state) {
  return {
    userCursor: state.video.userCursor,
    isPlaying: state.video.isPlaying,
    volumeLevel: state.video.volumeLevel
  }
}

export default composeAll(
  connect(mapState),
  useDeps(mapActions)
)(ResponsivePlayer)