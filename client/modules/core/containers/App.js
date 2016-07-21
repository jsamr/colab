import App from '../components/App'

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(App)