import React, { PropTypes } from 'react'
import LoadableComponent from './LoadableComponent'
import { fColumnNoWrap, fInlineNoWrapCentered } from '/imports/styles'
import TimeControls from '../containers/TimeControls'
import ToggleTimeLine from '../containers/ToggleTimeLine'

const CONTROLS_HEIGHT = 50

const LeftMenu = ({ expLoading, experiment, style, minWidth = 300 }, { theme }) => {
  const getInner = () => (
    [
      <div key='body' style={{ flexGrow: 1, width: '100%', height: 1}} ></div>,
      <div key='controls' style={{ ...fInlineNoWrapCentered, flexWrap: 'wrap', justifyContent: 'space-around', background: theme.palette.controlsColor  }}>
        <ToggleTimeLine experiment={experiment} height={CONTROLS_HEIGHT} />
        <TimeControls experiment={experiment} style={{ height: CONTROLS_HEIGHT }} />
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
        margin: 0,
        flexBasis: 300,
        minWidth,
        flexGrow: expLoading ? 1 : 100,
        ...fColumnNoWrap,
        justifyContent: 'space-around',
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
