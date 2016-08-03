import React, { PropTypes } from 'react'
import LoadableComponent from './LoadableComponent'
import ResponsivePlayer from '../../video/containers/ResponsivePlayer'

const VideoBox = ({ expLoading, maxWidth }, { theme }) => {
  const getInner = () => <ResponsivePlayer dataLoading={expLoading} maxWidth={maxWidth}
                                           style={{ flexGrow: 1, background: 'transparent', order: 2, display: 'flex', justifyContent: 'center' }} />
  return getInner()
  //return <LoadableComponent
  //  loading={expLoading}
  //  getInner={getInner}
  //  style={{ background: 'transparent', order: 2, flexGrow: 10, display: 'flex' }} />
}

VideoBox.propTypes = {
  expLoading: PropTypes.bool.isRequired,
  maxWidth: PropTypes.number.isRequired
}

VideoBox.contextTypes = {
  theme: PropTypes.object.isRequired
}

export default VideoBox
