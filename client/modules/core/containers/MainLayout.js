import { notifySubReady } from '../actions'
import MainLayout from '../components/MainLayout.jsx'
import { useDeps } from 'mantra-core'
import {  composeAll, composeWithTracker, compose } from 'react-komposer'
import { getConfig } from '/imports/api/Config'
import { connect } from 'react-redux'
import AppLoading from '/imports/ui/AppLoading'

const storeMapper = (context, actions) => ({
  store: context.Store
})

function confComposer ({ context }, onData) {
  const { Store, Meteor } = context()
  const confSub = Meteor.subscribe('globalconfig')
  if (confSub.ready()) {
    Store.dispatch(notifySubReady())
    onData(null, { config: getConfig() })
  }
}

function loadComposer(params, onData) {
  setTimeout(() => onData(null, {}), 500)
}

export default composeAll(
  composeWithTracker(confComposer, AppLoading),
  useDeps(),
  compose(loadComposer, AppLoading),
  useDeps(storeMapper)
)(MainLayout)

export {
  storeMapper,
  confComposer
}
