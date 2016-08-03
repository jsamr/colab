import React, { PropTypes } from 'react'
import LoadableComponent from './LoadableComponent'
import { fColumnNoWrap, fInlineNoWrapCentered } from '/imports/styles'
import TimeControls from '../containers/TimeControls'

const LeftMenu = ({ expLoading, experiment, style, minWidth = 300 }, { theme }) => {
  const getInner = () => (
    [
      <div key='body' style={{ flexGrow: 1, width: '100%', height: 1}} ></div>,
      <div key='controls' style={{ ...fInlineNoWrapCentered, flexBasis: 50, justifyContent: 'center', background: theme.palette.controlsColor  }}>
        <TimeControls experiment={experiment} />
      </div>
    ]
  )
  return (
    <LoadableComponent
      loading={expLoading}
      getInner={getInner}
      style={{
        background: theme.palette.canvasColor,
        order: 1,
        margin: '0',
        flexBasis: 300,
        minWidth,
        flexGrow: expLoading ? 1 : 100,
        ...fColumnNoWrap,
        justifyContent: 'space-between',
        ...style
      }} />)
}

LeftMenu.propTypes = {
  expLoading: PropTypes.bool.isRequired,
  minWidth: PropTypes.number,
  experiment: PropTypes.object
}

LeftMenu.contextTypes = {
  theme: PropTypes.object.isRequired
}

export default LeftMenu
