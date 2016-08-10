import VideoBox from '../components/VideoBox'
import { connect } from 'react-redux'
import { composeAll, useDeps } from 'mantra-core'
import getp from 'lodash/get'
import { mapIsPlaying } from '../../video/containers/PlayPauseButton'

function mapPlaces (state, { experiment, captions }) {
  const expState = experiment ? state.experiments[experiment._id] : null
  const places = getp(expState, 'places')
  const caption = captions && captions[getp(expState, 'source')]
  return {
    places,
    caption
  }
}

export default composeAll(
  connect(mapIsPlaying),
  connect(mapPlaces),
  useDeps()
)(VideoBox)
