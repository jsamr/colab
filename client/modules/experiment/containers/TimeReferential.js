import TimeReferential from '../components/TimeReferential'
import { connect } from 'react-redux'

function mapWindow ({ window }) {
  let { height, width } = window
  return {
    view: {
      height,
      width
    }
  }
}

export default connect(mapWindow)(TimeReferential)
