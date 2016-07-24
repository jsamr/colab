import MainLayout from './containers/MainLayout'
import App from './containers/App'
import React from 'react'
import ReactDOM from 'react-dom'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'
import createRoot from './libs/create-root'
import DashBoard from '../dashboard/components/DashBoard'
import RichLoginForm from '../auth/components/RichLoginForm'

export default function (inject, { Store, ACCOUNT_STATES, ROUTES, t, nav, VERSION, theme }) {
  const MainLayoutCtx = inject(MainLayout)
  const history = syncHistoryWithStore(browserHistory, Store)
  const loginProps = {
    goToSignUp: () => Store.dispatch(nav(ROUTES.REGISTER)),
    goToSignIn: () => Store.dispatch(nav(ROUTES.LOGIN))
  }
  const LoginForm = () => <RichLoginForm formState={ ACCOUNT_STATES.SIGN_IN } { ...loginProps } />
  const RegisterForm = () => <RichLoginForm loginPath={ ROUTES.LOGIN } formState={ ACCOUNT_STATES.SIGN_UP } { ...loginProps } />

  ReactDOM.render(
    <MainLayoutCtx t={t} VERSION={VERSION} theme={theme}>
      <Router history={history}>
        <Route path='/' component={App}>
          <IndexRedirect to={ ROUTES.HOME } />
          <Route path={ ROUTES.LOGIN } component={ LoginForm } />
          <Route path={ ROUTES.REGISTER } component={ RegisterForm } />
          <Route path={ ROUTES.HOME } component={ DashBoard } />
        </Route>
      </Router>
    </MainLayoutCtx>,
    createRoot()
  )
}
