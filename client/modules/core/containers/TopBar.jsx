import TopBar from '../components/TopBar'
import { connect } from 'react-redux'

function connectUser (state) {
  console.info(state.auth)
  return {
    user: state.auth.user
  }
}

export default connect(connectUser)(TopBar)