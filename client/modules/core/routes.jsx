import { MainLayout } from './components/MainLayout.jsx'
import React from 'react'
import ReactDOM from 'react-dom'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
const Layout = () => <div>Hi dude!</div>
import { composeWithTracker } from 'react-komposer'
import { notifySubReady } from './actions'

function createRoot () {
  const approot = document.createElement('div')
  approot.id = 'approot'
  document.body.appendChild(approot)
  return approot
}

export default function (inject, { Store, Meteor }) {
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

        </Route>
      </Router>
    </MainLayoutCtx>,
    createRoot()
  )
}
