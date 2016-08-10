import MainLayout from '../components/MainLayout.jsx'
import { useDeps } from 'mantra-core'
import {  composeAll, composeWithTracker, compose } from 'react-komposer'
import { getConfig } from '/imports/api/Config'

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
    onData(null, { config: getConfig(), configLoading: false })
  } else {
    onData(null, { configLoading: true })
  }
}

function loadComposer (params, onData) {
  setTimeout(() => onData(null, { delayLoading: false }), 600)
  onData(null, { delayLoading: true })
}

export default composeAll(
  composeWithTracker(confComposer),
  compose(loadComposer),
  useDeps(mapDepsToProps)
)(MainLayout)

export {
  confComposer
}
