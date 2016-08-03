import React, { PropTypes } from 'react'
import LoadableComponent from './LoadableComponent'
import TimeControls from '../containers/TimeControls'
import { fInlineCenter } from '/imports/styles'
import Paper from 'material-ui/Paper'
import ProgressControl from '../../video/containers/ProgressControl'
import PlayPauseButton from '../../video/containers/PlayPauseButton'
import VolumeControl from '../../video/containers/VolumeControl'

const VideoControls = ({ expLoading, experiment }, { theme }) => {
  const getInner = () => (
    [<div key='VideoControls' style={{ flexGrow: 1, display: 'flex', alignItems: 'center', margin: '0 10px' }}>
      <PlayPauseButton preferredWidth={60} />
      <VolumeControl preferredWidth={200} />
      <ProgressControl style={{ marginLeft: 10 }} />
    </div>,
    <TimeControls style={{ background: theme.palette.primary1Color }} key='TimeControls' experiment={experiment} />]
  )
  return <LoadableComponent
    getInner={getInner}
    loading={expLoading}
    style={{ background: theme.palette.canvasColor, flexBasis: 60, display: 'flex' }} />
}

VideoControls.propTypes = {
  expLoading: PropTypes.bool.isRequired
}

VideoControls.contextTypes = {
  theme: PropTypes.object.isRequired
}

export default VideoControls

