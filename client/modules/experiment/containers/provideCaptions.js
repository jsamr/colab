import { composeWithTracker, composeAll } from 'react-komposer'
import { useDeps } from 'mantra-core'
import { connect } from 'react-redux'
import map from 'lodash/map'
import Caption from '/imports/api/Caption'
import keyBy from 'lodash/keyBy'

const DEFAULT = { captions: null }

function trackCaptions ({ context, experiment, project, places }, onData) {
  const { Meteor } = context()
  if (experiment && project && places) {
    const placesNames = map(places, 'place')
    const sub = Meteor.subscribe('plugins.captions', experiment.name, project._id, placesNames)
    if (sub.ready()) {
      onData(null, { captions: keyBy(Caption.find({ expId: experiment._id }).fetch(), 'place') })
    } else onData(null, DEFAULT)
  } else onData(null, DEFAULT)
}

function mapPlaces ({ experiments }, { experiment }) {
  return {
    places: experiment ? experiments[experiment._id].places : null
  }
}

export default function (Component) {
  return composeAll(
    composeWithTracker(trackCaptions),
    useDeps(),
    connect(mapPlaces)
  )(Component)
}

