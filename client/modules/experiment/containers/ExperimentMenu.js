import ExperimentMenu from '../components/ExperimentMenu'
import { connect } from 'react-redux'
import { useDeps, composeAll } from 'mantra-core'
import partialRight from 'lodash/partialRight'

function mapProps (state, { actions, experiment }) {
  const { selectMenuTab } = actions().experiments
  return {
    selectMenuTab: partialRight(selectMenuTab, experiment),
    selectedMenuTab: state.experiments[experiment._id].menuTab
  }
}

export default composeAll(
  connect(mapProps),
  useDeps()
)(ExperimentMenu)
