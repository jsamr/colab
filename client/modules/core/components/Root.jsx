import React, { PropTypes, Component } from 'react'

class Root extends Component {
  componentDidMount () {
    let { nav, ROUTES, user } = this.context
    if (user != null) nav(ROUTES.HOME)
    else nav(ROUTES.LOGIN)
  }

  render () {
    return <div></div>
  }
}

Root.contextTypes = {
  nav: PropTypes.func.isRequired,
  ROUTES: PropTypes.object.isRequired,
  user: PropTypes.object
}

export default Root
