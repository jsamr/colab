import React, { PropTypes, Component } from 'react'
import LoadableComponent from './LoadableComponent'
import ResponsivePlayer from '../../video/containers/ResponsivePlayer'
import VideoControls from './VideoControls'
import TimeIndicator from '../containers/TimeIndicator'
import { transitionSlow } from '/imports/styles'
import autobind from 'autobind-decorator'

const CONTROLS_DIMENSIONS = {
  height: 50,
  width: '100%',
  position: 'absolute',
  bottom: 0,
  left: 0,
  background: 'rgba(45, 45, 45, 0.3)'
}

@autobind
class VideoBox extends Component {

  constructor (props) {
    super(props)
    this.state = {
      hovered: false
    }
  }

  handleHoverIn () {
    this.setState({
      hovered: true
    })
  }

  handleHoverOut () {
    this.setState({
      hovered: false
    })
  }

  render () {
    const { expLoading, experiment, maxWidth, mainHeight, fullHeight, isPlaying } = this.props
    const { theme, CONF } = this.context
    const { hovered } = this.state
    const background = theme.palette.controlsColor
    const timeIndicator = experiment ? <TimeIndicator experiment={experiment} style={{ background, flexGrow: 1, textAlign: 'center', position: 'absolute', top: 0, right: 5 }} /> : null
    const showControls = !isPlaying || hovered
    return (
      <div
        onMouseEnter={this.handleHoverIn}
        onMouseLeave={this.handleHoverOut}
        style={{ flexGrow: expLoading ? 3 : 1, background: 'transparent', order: 2, display: 'flex', justifyContent: 'flex-start', position: 'relative', ...transitionSlow }}>
        <ResponsivePlayer
          progressUpdateFrequency={CONF.VIDEO_PROGRESS_UPDATE_FREQUENCY}
          dataLoading={expLoading}
          maxWidth={maxWidth}
          mainHeight={mainHeight}
          fullHeight={fullHeight} />
        {timeIndicator}
        <VideoControls
          style={{ ...CONTROLS_DIMENSIONS, background, opacity: showControls ? 1 : 0 }}
          experiment={experiment}
          expLoading={expLoading} />
      </div>
    )
  }
}

VideoBox.propTypes = {
  expLoading: PropTypes.bool.isRequired,
  maxWidth: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  mainHeight: PropTypes.number,
  fullHeight: PropTypes.bool
}

VideoBox.contextTypes = {
  theme: PropTypes.object.isRequired,
  CONF: PropTypes.object.isRequired
}

export default VideoBox
