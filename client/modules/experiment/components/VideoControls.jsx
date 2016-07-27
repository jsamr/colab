import React, { PropTypes } from 'react'
import LoadableComponent from './LoadableComponent'

const VideoControls = ({ expLoading }, { theme }) => {
  const getInner = () => <span></span>
  return <LoadableComponent
    getInner={getInner}
    loading={expLoading}
    style={{ background: theme.palette.accent2Color, height: 39, display: 'flex' }} />
}

VideoControls.propTypes = {
  expLoading: PropTypes.bool.isRequired
}

VideoControls.contextTypes = {
  theme: PropTypes.object.isRequired
}

export default VideoControls

