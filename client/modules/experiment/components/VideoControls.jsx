import React, { PropTypes } from 'react'
import LoadableComponent from './LoadableComponent'
import { TimeControls } from '../containers/controledComponents'
import { fInlineCenter } from '/imports/styles'
import Paper from 'material-ui/Paper'
const VideoControls = ({ expLoading, experiment }, { theme }) => {
  const getInner = () => (
        [<div key='VideoControls' style={{ flexGrow: 1 }} />,
        <TimeControls key='TimeControls' experiment={experiment} />]
  )
  return <LoadableComponent
    getInner={getInner}
    loading={expLoading}
    style={{ background: theme.palette.accent3Color, flexBasis: 60, display: 'flex' }} />
}

VideoControls.propTypes = {
  expLoading: PropTypes.bool.isRequired
}

VideoControls.contextTypes = {
  theme: PropTypes.object.isRequired
}

export default VideoControls

