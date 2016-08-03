import TimeReferential from '../components/TimeReferential'
import { connect } from 'react-redux'

function mapWindow ({ window, experiments }, { experiment }) {
  const { height, width } = window
  const { controls } = experiments[experiment._id ]
  return {
    view: {
      height,
      width
    },
    controls
  }
}

export default connect(mapWindow)(TimeReferential)
