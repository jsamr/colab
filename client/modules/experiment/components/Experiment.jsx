import React, { PropTypes } from 'react'
import SimpleLoading from '/imports/ui/SimpleLoading'
import DefaultPageRoot from '/imports/ui/DefaultPageRoot'
import LeftMenu from './LeftMenu'
import VideoBox from './VideoBox'
import VideoControls from './VideoControls'
import TimeLine from '../containers/TimeLine'
import NotFound from '/imports/ui/NotFound'

import { fColumnNoWrap } from '/imports/styles'

const Experiment = ({ height, loading, project, experiment }, { t }) => {
  let elems
  if (!loading && !experiment) elems = <NotFound message={t('exp.notfound')}/>
  else {
    elems = (
      <div style={{ height: height, width: '100%' }}>
        { /* Upper section */ }
        <div style={{ ...fColumnNoWrap, height: '76%' }}>
          <div style={{ alignItems: 'stretch', display: 'flex', flexFlow: 'row nowrap', flexGrow: 1 }}>
            <LeftMenu experiment={experiment} expLoading={loading} />
            <VideoBox experiment={experiment} expLoading={loading} />
          </div>
          <VideoControls experiment={experiment} expLoading={loading} />
        </div>
        { /* Lower section */ }
        <div style={{ height: '24%' }}>
          <TimeLine project={project} experiment={experiment} expLoading={loading} />
        </div>
      </div>
    )
  }
  return elems
}

Experiment.contextTypes = {
  t: PropTypes.func.isRequired
}

Experiment.propTypes = {
  loading: PropTypes.bool.isRequired,
  experiment: PropTypes.object,
  project: PropTypes.object
}

export default Experiment