import React, { PropTypes } from 'react'
import SimpleLoading from '/imports/ui/SimpleLoading'
import DefaultPageRoot from '/imports/ui/DefaultPageRoot'
import LeftMenu from './LeftMenu'
import VideoBox from './VideoBox'
import VideoControls from './VideoControls'
import TimeLine from '../containers/TimeLine'
import NotFound from '/imports/ui/NotFound'

import { fColumnNoWrap } from '/imports/styles'
const LEFT_MENU_MIN_WIDTH = 300

const Experiment = ({ height, width, loading, project, experiment }, { t, theme }) => {
  let elems
  if (!loading && !experiment) elems = <NotFound message={t('exp.notfound')}/>
  else {
    elems = (
      <div style={{ height: height, width: '100%', background: theme.palette.headerColor }}>
        { /* Upper section */ }
        <div style={{ ...fColumnNoWrap, height: '76%', width: '100%' }}>
          <div style={{ alignItems: 'stretch', display: 'flex', flexFlow: 'row nowrap', flexGrow: 1 }}>
            <LeftMenu experiment={experiment} minWidth={LEFT_MENU_MIN_WIDTH} expLoading={loading} />
            <VideoBox experiment={experiment} maxWidth={width - LEFT_MENU_MIN_WIDTH} expLoading={loading} />
          </div>
          <VideoControls experiment={experiment} expLoading={loading} />
        </div>
        { /* Lower section */ }
        <div style={{ height: '24%', background: theme.palette.primary1Color }}>
          <TimeLine project={project} experiment={experiment} expLoading={loading} />
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
  width: PropTypes.number.isRequired
}

export default Experiment