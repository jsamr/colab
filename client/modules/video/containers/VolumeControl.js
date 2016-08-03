import VolumeControl from '../components/VolumeControl'
import { connect } from 'react-redux'
import { useDeps } from 'mantra-core'
import  { composeAll } from 'react-komposer'

function mapActions (context, actions) {
  return {
    setVolumeLevel: actions.video.setVolumeLevel
  }
}

function mapIsVolumeLevel (state) {
  return {
    volumeLevel: state.video.volumeLevel
  }
}

export default composeAll(
  connect(mapIsVolumeLevel),
  useDeps(mapActions)
)(VolumeControl)
