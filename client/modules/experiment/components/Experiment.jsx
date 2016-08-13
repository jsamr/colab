import React, { PropTypes, Component } from 'react'
import LeftMenu from './LeftMenu'
import VideoBox from '../containers/VideoBox'
import TimeLine from '../containers/TimeLine'
import NotFound from '/imports/ui/NotFound'
import { fColumnNoWrap, transitionFast } from '/imports/styles'

const LEFT_MENU_MIN_WIDTH = 300

class Experiment extends Component {
  static contextTypes = {
    t: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    muiTheme: PropTypes.object.isRequired
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    experiment: PropTypes.object,
    project: PropTypes.object,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    timeLineVisible: PropTypes.bool.isRequired,
    captions: PropTypes.object
  }

  render () {
    const { height, width, loading, project, experiment, timeLineVisible, captions } = this.props
    const { t, theme, muiTheme } = this.context
    let elems
    if (!loading && !experiment) elems = <NotFound message={t('experiment.notfound')}/>
    else {
      const showTimeLine = timeLineVisible || loading
      elems = (
        <div style={{ height, width: '100%', background: 'transparent', overflow: 'hidden' }}>
          { /* Upper section */ }
          <div
            style={{ ...fColumnNoWrap, height: showTimeLine ? '76%' : '100%', width: '100%', position: 'relative', ...transitionFast }}>
            <div
              style={{ alignItems: 'stretch', display: 'flex', flexFlow: 'row nowrap', flexGrow: 1, height: '100%', justifyContent: 'space-between' }}>
              <LeftMenu experiment={experiment}
                        minWidth={LEFT_MENU_MIN_WIDTH}
                        expLoading={loading}
              />
              <VideoBox experiment={experiment}
                        maxWidth={width - LEFT_MENU_MIN_WIDTH}
                        expLoading={loading}
                        mainHeight={height}
                        fullHeight={!showTimeLine}
                        captions={captions}
              />
            </div>
          </div>
          { /* Lower section */ }
          <div style={{ height: showTimeLine ? '24%' : '0%', background: 'transparent' }}>
            <TimeLine project={project} experiment={experiment} expLoading={loading} visible={showTimeLine}/>
          </div>
        </div>
      )
    }
    return elems
  }
}

export default Experiment
