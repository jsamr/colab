import Account from '../components/Account'
import { connect } from 'react-redux'

function connectUser (state) {
  return {
    user: state.auth.user
  }
}

export default connect(connectUser)(Account)