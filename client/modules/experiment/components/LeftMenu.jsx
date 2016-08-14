import React, { PropTypes } from 'react'
import LoadableComponent from './LoadableComponent'
import { fColumnNoWrap, fInlineNoWrapCentered, transitionVerySlow } from '/imports/styles'
import TimeControls from '../containers/TimeControls'
import ToggleTimeLine from '../containers/ToggleTimeLine'
import ExperimentMenu from '../containers/ExperimentMenu'
import FormContainer from './FormContainer'
const CONTROLS_HEIGHT = 50

const LeftMenu = ({ expLoading, experiment, style, minWidth = 300 }, { muiTheme }) => {
  const toggle = experiment ? <ToggleTimeLine experiment={experiment} height={CONTROLS_HEIGHT} /> : null
  const form = false
  const inner = form ? <FormContainer /> : <ExperimentMenu key='menu' experiment={experiment} />
  const spacing = muiTheme.experiment.padding
  const getInner = () => (
    [
      inner,
      <div key='controls'
        style={{ ...fInlineNoWrapCentered, flexWrap: 'wrap', justifyContent: 'space-around', background: muiTheme.experiment.timeLineBackground }}>
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
        ...fColumnNoWrap,
        ...transitionVerySlow,
        order: 1,
        margin: 0,
        marginRight: spacing,
        marginTop: spacing,
        flexBasis: minWidth,
        background: muiTheme.application.background,
        minWidth,
        flexGrow: 10,
        justifyContent: 'space-around',
        maxWidth: 700,
        ...style
      }} />)
}

LeftMenu.propTypes = {
  expLoading: PropTypes.bool.isRequired,
  minWidth: PropTypes.number,
  experiment: PropTypes.object,
  style: PropTypes.object
}

LeftMenu.contextTypes = {
  theme: PropTypes.object.isRequired,
  muiTheme: PropTypes.object.isRequired
}

export default LeftMenu
