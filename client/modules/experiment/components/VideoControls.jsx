import React, { PropTypes } from 'react'
import LoadableComponent from './LoadableComponent'
import TimeControls from '../containers/TimeControls'
import { fInlineCenter } from '/imports/styles'
import Paper from 'material-ui/Paper'
import ProgressControl from '../../video/containers/ProgressControl'
import PlayPauseButton from '../../video/containers/PlayPauseButton'
import VolumeControl from '../../video/containers/VolumeControl'

const VideoControls = ({ expLoading, style }, { theme }) => {
  const playerTheme = {
    main: theme.palette.accent1Color,
    loaded: 'rgb(180, 180, 180)',
    notLoaded: 'rgba(21, 21, 21, 0.65)'
  }
  const getInner = () => (
    <div key='VideoControls' style={{ flexGrow: 1, display: 'flex', alignItems: 'center', margin: '0 10px', background: 'transparent' }}>
      <PlayPauseButton preferredWidth={60} theme={playerTheme} />
      <VolumeControl preferredWidth={200} theme={playerTheme} />
      <ProgressControl style={{ marginLeft: 10 }} theme={playerTheme} />
    </div>
  )
  return <LoadableComponent
    getInner={getInner}
    loading={expLoading}
    style={{ background: 'transparent', flexBasis: 60, display: 'flex', ...style }} />
}

VideoControls.propTypes = {
  expLoading: PropTypes.bool.isRequired
}

VideoControls.contextTypes = {
  theme: PropTypes.object.isRequired
}

export default VideoControls

