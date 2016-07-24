import { connect } from 'react-redux'
import Status from '../components/Status'

function mapAuthStatus (state) {
  return {
    valid: state.media.valid,
    pending: state.media.pending
  }
}
// TODO add a loader effect
export default connect(mapAuthStatus)(Status)

