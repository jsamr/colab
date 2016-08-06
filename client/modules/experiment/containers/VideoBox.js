import VideoBox from '../components/VideoBox'
import { connect } from 'react-redux'
import { composeAll, useDeps } from 'mantra-core'
import { mapIsPlaying } from '../../video/containers/PlayPauseButton'

function mapPlaces (state, { experiment }) {
  return {
    places: experiment ? state.experiments[experiment._id].places : null
  }
}

export default composeAll(
  connect(mapIsPlaying),
  connect(mapPlaces),
  useDeps()
)(VideoBox)
