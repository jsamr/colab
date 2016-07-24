import App from '../components/App'

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    wHeight: state.window.height
  }
}

export default connect(mapStateToProps)(App)