import React, { PropTypes } from 'react'
import LoadableComponent from './LoadableComponent'
import { fColumnNoWrap, fInlineNoWrapCentered, transitionVerySlow } from '/imports/styles'
import TimeControls from '../containers/TimeControls'
import ToggleTimeLine from '../containers/ToggleTimeLine'
import ExperimentMenu from '../containers/ExperimentMenu'
import FormContainer from './FormContainer'
const CONTROLS_HEIGHT = 50

const LeftMenu = ({ expLoading, experiment, style, minWidth = 300 }, { theme, muiTheme }) => {
  const toggle = experiment ? <ToggleTimeLine experiment={experiment} height={CONTROLS_HEIGHT} /> : null
  const form = true
  const inner = form ? <FormContainer /> : <ExperimentMenu key='menu' experiment={experiment} />
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
        order: 1,
        margin: 0,
        flexBasis: minWidth,
        background: muiTheme.application.background,
        minWidth,
        flexGrow: 10,
        ...fColumnNoWrap,
        justifyContent: 'space-around',
        maxWidth: 700,
        marginTop: muiTheme.experiment.padding,
        ...style,
        ...transitionVerySlow
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
