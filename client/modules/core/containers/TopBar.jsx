import TopBar from '../components/TopBar'
import { connect } from 'react-redux'
import { useDeps } from 'mantra-core'
import { composeAll } from 'react-komposer'

function connectUser (state, { actions }) {
  let { logout } = actions().auth
  return {
    user: state.auth.user,
    logout
  }
}

export default composeAll(
  connect(connectUser),
  useDeps()
)(TopBar)
