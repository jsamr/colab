import TopBar from '../containers/TopBar'
import MainWrapper from './MainWrapper'
import React, { Component, PropTypes } from 'react'
import includes from 'lodash/includes'
import LoginForm from '../../auth/components/LoginForm'

const TOPBAR_BASE_HEIGHT = 64

class App extends Component {

  getChildContext () {
    return {
      user: this.props.user
    }
  }

  createLoginFallback () {
    return (<LoginForm header={(<h1>{this.context.t('auth.should')}</h1>)}/>)
  }

  render () {
    let { ROUTES } = this.context
    let { user } = this.props
    const isLoggingIn = includes([ ROUTES.LOGIN, ROUTES.REGISTER, ROUTES.ROOT ], this.props.location.pathname)
    const isLoggedIn = user != null
    const inner = !isLoggedIn && !isLoggingIn ? this.createLoginFallback() : this.props.content
    return (
      <div className='application' >
        <TopBar pageTitle={this.props.pageTitle} />
        <MainWrapper
          className='page'
          style={{ minHeight: this.props.mainHeight,
            position: 'relative',
            top: this.props.topBarHeight, display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch'
            }}>
          {inner}
        </MainWrapper>
      </div>
    )
  }
}

App.childContextTypes = {
  user: PropTypes.object
}

App.contextTypes = {
  t: PropTypes.func.isRequired,
  ROUTES: PropTypes.object
}

App.propTypes = {
  mainHeight: PropTypes.number.isRequired,
  topBarHeight: PropTypes.number.isRequired,
  content: PropTypes.node.isRequired,
  pageTitle: PropTypes.node,
  user: PropTypes.object
}

export default App
