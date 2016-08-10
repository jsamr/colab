import TopBar from '../components/TopBar'
import { connect } from 'react-redux'
import { useDeps } from 'mantra-core'
import { composeAll } from 'react-komposer'

function connectUser (state, { actions }) {
  let { logout } = actions().auth
  let { setTopBarHeight } = actions().window
  return {
    user: state.auth.user,
    onHeightUpdate: setTopBarHeight,
    logout
  }
}

function mapDeps (context, actions) {
  return {
    preferredHeight: context.CONF.TOPBAR_BASE_HEIGHT,
    actions: () => actions
  }
}

export default composeAll(
  connect(connectUser),
  useDeps(mapDeps)
)(TopBar)
