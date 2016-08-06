import Sources from '../components/Sources'
import { connect } from 'react-redux'
import { useDeps, composeAll } from 'mantra-core'
import partialRight from 'lodash/partialRight'

function mapProps (state, { experiment, actions }) {
  const { selectSource, refreshSources } = actions().experiments
  const expState = state.experiments[experiment._id ]
  return {
    places: expState.places,
    source: expState.source,
    placesError: expState.placesError,
    selectSource: partialRight(selectSource, experiment),
    refreshSources: partialRight(refreshSources, experiment)
  }
}

export default composeAll(
  connect(mapProps),
  useDeps()
)(Sources)
