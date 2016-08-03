import React, { PropTypes } from 'react'
import LoadableComponent from './LoadableComponent'
import { fColumnNoWrap } from '/imports/styles'

const LeftMenu = ({ expLoading, minWidth = 300 }, { theme }) => {
  const getInner = () => <span></span>
  return (
    <LoadableComponent
      loading={true}
      getInner={getInner}
      style={{
        background: theme.palette.canvasColor,
        order: 1,
        margin: '8px 0',
        flexBasis: 300,
        minWidth,
        flexGrow: 5,
        ...fColumnNoWrap
      }} />)
}

LeftMenu.propTypes = {
  expLoading: PropTypes.bool.isRequired,
  minWidth: PropTypes.number
}

LeftMenu.contextTypes = {
  theme: PropTypes.object.isRequired
}

export default LeftMenu
