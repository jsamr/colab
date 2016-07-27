import React, { PropTypes } from 'react'
import LoadableComponent from './LoadableComponent'

const flexNoWrap = {
  display: 'flex',
  flexFlow: 'column nowrap'
}

const LeftMenu = ({ expLoading }, { theme }) => {
  const getInner = () => <span></span>
  return (
    <LoadableComponent
      loading={expLoading}
      getInner={getInner}
      style={{ background: theme.palette.primary2Color, order: 1, flexBasis: 300, ...flexNoWrap }} />)
}

LeftMenu.propTypes = {
  expLoading: PropTypes.bool.isRequired
}

LeftMenu.contextTypes = {
  theme: PropTypes.object.isRequired
}

export default LeftMenu
