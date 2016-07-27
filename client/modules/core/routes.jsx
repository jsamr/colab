import MainLayout from './containers/MainLayout'
import App from './containers/App'
import React from 'react'
import ReactDOM from 'react-dom'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import createRoot from './libs/create-root'
import DashBoard from '../dashboard/components/DashBoard'
import LoginForm from '../auth/components/LoginForm'
import RegisterForm from '../auth/components/RegisterForm'
import Experiment from '../experiment/containers/Experiment'
import ExperimentHeader from '../experiment/containers/ExperimentHeader'
import Root from './components/Root'
import Warning from 'material-ui/svg-icons/alert/warning'

export default function (inject, { Store, ACCOUNT_STATES, ROUTES, t, nav, VERSION, theme }) {
  const MainLayoutCtx = inject(MainLayout)
  const history = syncHistoryWithStore(browserHistory, Store)
  ReactDOM.render(
    <MainLayoutCtx t={t} VERSION={VERSION} theme={theme} nav={nav} ROUTES={ROUTES} ACCOUNT_STATES={ACCOUNT_STATES}>
      <Router history={history} >
        <Route path='/' component={App}>
          <IndexRoute components={{ content: Root }} />
          <Route path={ ROUTES.LOGIN } components={{ content: LoginForm }} />
          <Route path={ ROUTES.REGISTER } components={{ content: RegisterForm }} />
          <Route path={ ROUTES.HOME } components={{ content: DashBoard }} />
          <Route path={ ROUTES.EXPERIMENT } components={{ content: Experiment, pageTitle: ExperimentHeader }} />
        </Route>
      </Router>
    </MainLayoutCtx>,
    createRoot()
  )
}
