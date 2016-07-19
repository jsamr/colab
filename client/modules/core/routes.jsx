import { MainLayout } from './components/MainLayout.jsx'
import React from 'react'
import ReactDOM from 'react-dom'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
const Layout = (props) => <div>Hi dude! {props.children}</div>
import { composeWithTracker } from 'react-komposer'
import { notifySubReady } from './actions'
import createRoot from './libs/create-root'

export default function (inject, { Store, Meteor, Accounts, ACCOUNT_STATES }) {
  function composer (props, onData) {
    if (Meteor.subscribe('globalconfig').ready()) {
      if (Store.getState().auth.id) Store.dispatch(notifySubReady())
      onData(null, { })
    }
  }
  const MainLayoutCtx = composeWithTracker(composer)(inject(MainLayout))
  const history = syncHistoryWithStore(browserHistory, Store)
  ReactDOM.render(
    <MainLayoutCtx>
      <Router history={history}>
        <Route path='/' component={Layout}>
          <Route path='/login' component={ Accounts.ui.LoginForm } formState={ ACCOUNT_STATES.SIGN_IN } />
          <Route path='/register' component={ Accounts.ui.LoginForm } formState={ ACCOUNT_STATES.SIGN_UP } />
        </Route>
      </Router>
    </MainLayoutCtx>,
    createRoot()
  )
}
