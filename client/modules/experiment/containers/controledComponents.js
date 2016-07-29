import TC from '../components/TimeControls'
import TI from '../components/TimeIndicator'
import { connect } from 'react-redux'

const mapControls = ({ experiments }, { experiment }) => ({
  controls: experiments[experiment._id ].controls
})

const TimeControls = connect(mapControls)(TC)

export {
  TimeControls,
  mapControls
}

