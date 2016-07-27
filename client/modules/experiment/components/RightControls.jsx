import React, { PropTypes } from 'react'
import LoadableComponent from './LoadableComponent'

const RightControls = ({ expLoading }, { theme }) => {
  const getInner = () => <span></span>
  return <LoadableComponent
    getInner={getInner}
    loading={expLoading}
    style={{ background: theme.palette.primary2Color, order: 3, flexBasis: 150, display: 'flex' }} />
}

RightControls.propTypes = {
  expLoading: PropTypes.bool.isRequired
}

RightControls.contextTypes = {
  theme: PropTypes.object.isRequired
}

export default RightControls
