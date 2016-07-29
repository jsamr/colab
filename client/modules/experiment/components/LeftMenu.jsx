import React, { PropTypes } from 'react'
import LoadableComponent from './LoadableComponent'
import { fColumnNoWrap } from '/imports/styles'

const LeftMenu = ({ expLoading }, { theme }) => {
  const getInner = () => <span></span>
  return (
    <LoadableComponent
      loading={expLoading}
      getInner={getInner}
      style={{ background: theme.palette.primary1Color, order: 1, flexBasis: 300, ...fColumnNoWrap }} />)
}

LeftMenu.propTypes = {
  expLoading: PropTypes.bool.isRequired
}

LeftMenu.contextTypes = {
  theme: PropTypes.object.isRequired
}

export default LeftMenu
