import VideoBox from '../components/VideoBox'
import { connect } from 'react-redux'
import { mapIsPlaying } from '../../video/containers/PlayPauseButton'

export default connect(mapIsPlaying)(VideoBox)

