import MainLayout from '../components/MainLayout.jsx'
import { useDeps } from 'mantra-core'
import {  composeAll, composeWithTracker, compose } from 'react-komposer'
import { getConfig } from '/imports/api/Config'
import { connect } from 'react-redux'
import AppLoading from '/imports/ui/AppLoading'

const mapDepsToProps = (context, { window, sub }) => ({
  setWinHeight: window.setHeight,
  setWinWidth: window.setWidth,
  notifySubReady: sub.notifyReady,
  store: context.Store,
  context: () => context
})

function confComposer ({ context, notifySubReady }, onData) {
  const { Meteor } = context()
  const confSub = Meteor.subscribe('globalconfig')
  if (confSub.ready()) {
    notifySubReady()
    onData(null, { config: getConfig() })
  }
}

function loadComposer (params, onData) {
  setTimeout(() => onData(null, {}), 500)
}

export default composeAll(
  composeWithTracker(confComposer, AppLoading),
  compose(loadComposer, AppLoading),
  useDeps(mapDepsToProps)
)(MainLayout)

export {
  confComposer
}
