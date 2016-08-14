import App from '../components/App'
import { composeAll } from 'react-komposer'
import { useDeps } from 'mantra-core'

import { connect } from 'react-redux'

const mapDeps = (context) => {
  const { ROUTES, t } = context
  return ({
    ROUTES,
    t,
    context: () => context
  })
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    mainHeight: state.window.mainHeight,
    topBarHeight: state.window.topBarHeight
  }
}

export default composeAll(
  connect(mapStateToProps),
  useDeps(mapDeps)
)(App)
