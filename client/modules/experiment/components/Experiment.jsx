import React, { PropTypes } from 'react'
import SimpleLoading from '/imports/ui/SimpleLoading'
import DefaultPageRoot from '/imports/ui/DefaultPageRoot'
import LeftMenu from './LeftMenu'
import VideoBox from '../containers/VideoBox'
import VideoControls from './VideoControls'
import TimeLine from '../containers/TimeLine'
import NotFound from '/imports/ui/NotFound'

import { fColumnNoWrap, transitionFast } from '/imports/styles'
const LEFT_MENU_MIN_WIDTH = 300

const Experiment = ({ height, width, loading, project, experiment, timeLineVisible }, { t, theme }) => {
  let elems
  if (!loading && !experiment) elems = <NotFound message={t('exp.notfound')}/>
  else {
    const showTimeLine = timeLineVisible || loading
    elems = (
      <div style={{ height, width: '100%', background: theme.palette.headerColor, overflow: 'hidden' }}>
        { /* Upper section */ }
        <div style={{ ...fColumnNoWrap, height: showTimeLine ? '76%' : '100%', width: '100%', position: 'relative', ...transitionFast }}>
          <div style={{ alignItems: 'stretch', display: 'flex', flexFlow: 'row nowrap', flexGrow: 1, height: '100%' }}>
            <LeftMenu experiment={experiment} minWidth={LEFT_MENU_MIN_WIDTH} expLoading={loading} />
            <VideoBox experiment={experiment} maxWidth={width - LEFT_MENU_MIN_WIDTH} expLoading={loading} mainHeight={height} fullHeight={!showTimeLine} />
          </div>
        </div>
        { /* Lower section */ }
        <div style={{ height: showTimeLine ? '24%' : '0%', background: theme.palette.primary1Color }}>
          <TimeLine project={project} experiment={experiment} expLoading={loading} visible={showTimeLine}/>
        </div>
      </div>
    )
  }
  return elems
}

Experiment.contextTypes = {
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
}

Experiment.propTypes = {
  loading: PropTypes.bool.isRequired,
  experiment: PropTypes.object,
  project: PropTypes.object,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  timeLineVisible: PropTypes.bool
}

export default Experiment