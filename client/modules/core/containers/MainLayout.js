import { composeAll, composeWithTracker, compose } from 'react-komposer'
import { useDeps } from 'mantra-core'

import MainLayout from '../components/MainLayout.jsx'
import { getConfig } from '/imports/api/Config'
import loadLanguage from '/imports/loadLanguage'

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

function loadLang (params, onData) {
  loadLanguage('fr').then(() => onData(null, { delayLoading: false }))
  onData(null, { delayLoading: true })
}

const mapDepsToProps = (context, { window, sub }) => ({
  setWinHeight: window.setHeight,
  setWinWidth: window.setWidth,
  store: context.Store,
  notifySubReady: sub.notifyReady,
  context: () => context
})

export default composeAll(
  compose(loadLang),
  composeWithTracker(confComposer),
  useDeps(mapDepsToProps)
)(MainLayout)
