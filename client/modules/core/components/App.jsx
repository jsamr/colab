import TopBar from '../containers/TopBar'
import MainWrapper from './MainWrapper'
import React, { Component, PropTypes } from 'react'
import includes from 'lodash/includes'
import LoginForm from '../../auth/components/LoginForm'
import AppLoading from './AppLoading'

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
    const { ROUTES, theme, appLoading } = this.context
    const { user } = this.props
    const isLoggingIn = includes([ ROUTES.LOGIN, ROUTES.REGISTER, ROUTES.ROOT ], this.props.location.pathname)
    const isLoggedIn = user != null
    const shouldLogin = !isLoggedIn && !isLoggingIn
    let inner = null
    if (appLoading) {
      inner = <AppLoading />
    } else if (shouldLogin) {
      inner = this.createLoginFallback()
    } else {
      inner = this.props.content
    }
    return (
      <div className='application' style={{ background: theme.palette.pageBackground }}>
        <TopBar pageTitle={this.props.pageTitle} />
        <MainWrapper
          className='page'
          style={{ minHeight: this.props.mainHeight,
            position: 'relative',
            marginTop: this.props.topBarHeight,
            display: 'flex',
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
  ROUTES: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  appLoading: PropTypes.bool.isRequired
}

App.propTypes = {
  mainHeight: PropTypes.number.isRequired,
  topBarHeight: PropTypes.number.isRequired,
  content: PropTypes.node.isRequired,
  pageTitle: PropTypes.node,
  user: PropTypes.object
}

export default App
