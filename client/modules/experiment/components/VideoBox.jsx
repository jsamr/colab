import React, { PropTypes } from 'react'
import LoadableComponent from './LoadableComponent'

const VideoBox = ({ expLoading }, { theme }) => {
  const getInner = () => <span></span>
  return <LoadableComponent
    loading={expLoading}
    getInner={getInner}
    style={{ background: theme.palette.headerColor, order: 2, flexGrow: 1, display: 'flex' }} />
}

VideoBox.propTypes = {
  expLoading: PropTypes.bool.isRequired
}

VideoBox.contextTypes = {
  theme: PropTypes.object.isRequired
}

export default VideoBox
