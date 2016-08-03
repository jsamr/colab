import PlayPauseButton from '../components/PlayPauseButton'
import { connect } from 'react-redux'
import { useDeps } from 'mantra-core'
import  { composeAll } from 'react-komposer'

function mapActions (context, actions) {
  return {
    setPlayingState: actions.video.setPlayingState
  }
}

function mapIsPlaying (state) {
  return {
    isPlaying: state.video.isPlaying
  }
}

export default composeAll(
  connect(mapIsPlaying),
  useDeps(mapActions)
)(PlayPauseButton)

export {
  mapIsPlaying
}