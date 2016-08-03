import Projects from '../components/Projects'
import { useDeps, composeAll } from 'mantra-core'
import { connect } from 'react-redux'

function mapWindow (state) {
  return {
    mainHeight: state.window.mainHeight
  }
}

export default connect(mapWindow)(Projects)