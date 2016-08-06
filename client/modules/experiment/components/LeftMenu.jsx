import React, { PropTypes } from 'react'
import LoadableComponent from './LoadableComponent'
import { fColumnNoWrap, fInlineNoWrapCentered, transitionVerySlow } from '/imports/styles'
import TimeControls from '../containers/TimeControls'
import ToggleTimeLine from '../containers/ToggleTimeLine'
import ExperimentMenu from '../containers/ExperimentMenu'

const CONTROLS_HEIGHT = 50

const LeftMenu = ({ expLoading, experiment, style, minWidth = 300 }, { theme }) => {
  const toggle = experiment ? <ToggleTimeLine experiment={experiment} height={CONTROLS_HEIGHT} /> : null
  const getInner = () => (
    [
      <ExperimentMenu key='menu' experiment={experiment} />,
      <div key='controls'
           style={{ ...fInlineNoWrapCentered, flexWrap: 'wrap', justifyContent: 'space-around', background: theme.palette.controlsColor }}>
        {toggle}
        <TimeControls experiment={experiment} style={{ height: CONTROLS_HEIGHT }} />
      </div>
    ]
  )
  return (
    <LoadableComponent
      loading={expLoading}
      getInner={getInner}
      style={{
        order: 1,
        margin: 0,
        flexBasis: minWidth,
        background: 'transparent',
        minWidth,
        flexGrow: 1,
        ...fColumnNoWrap,
        justifyContent: 'space-around',
        maxWidth: 700,
        ...style,
        ...transitionVerySlow
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
