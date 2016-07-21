import { notifySubReady } from '../actions'
import MainLayout from '../components/MainLayout.jsx'
import { useDeps, composeAll, composeWithTracker } from 'mantra-core'
import { getConfig } from '/imports/api/Config'

const storeMapper = (context, actions) => ({
  store: context.Store
})

function confComposer ({ context }, onData) {
  console.info(arguments)
  const { Store, Meteor } = context()
  const confSub = Meteor.subscribe('globalconfig')
  if (confSub.ready()) {
    Store.dispatch(notifySubReady())
    onData(null, { config: getConfig() })
  }
}

export default composeAll(
  composeWithTracker(confComposer),
  useDeps(),
  useDeps(storeMapper)
)(MainLayout)

export {
  storeMapper,
  confComposer
}
