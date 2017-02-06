import React, { PropTypes } from 'react'
import ResponsivePlayer from '../../video/containers/ResponsivePlayer'
import VideoControls from './VideoControls'
import TimeIndicator from '../containers/TimeIndicator'
import { transitionSlow } from '/imports/styles'
import autobind from 'autobind-decorator'
import InfoFeedback from '/imports/ui/InfoFeedback'
import Hoverable from '/imports/ui/Hoverable'
import { fade } from 'material-ui/utils/colorManipulator'


const CONTROLS_DIMENSIONS = {
  height: 50,
  width: '100%',
  position: 'absolute',
  bottom: 0,
  left: 0,
  background: 'rgba(45, 45, 45, 0.3)'
}

const TIME_INDICATOR_STYLE = {
  flexGrow: 1,
  textAlign: 'center',
  position: 'absolute',
  top: 0, right: 0
}

const BOX_STYLE_BASE = {
  flexGrow: 1,
  minWidth: 300,
  background: 'transparent',
  order: 2,
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  marginRight: 'auto',
  marginLeft: 'auto'
}

@autobind
class VideoBox extends Hoverable {

  static propTypes = {
    expLoading: PropTypes.bool.isRequired,
    maxWidth: PropTypes.number.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    places: PropTypes.array,
    mainHeight: PropTypes.number,
    fullHeight: PropTypes.bool,
    experiment: PropTypes.object,
    captions: PropTypes.object,
    caption: PropTypes.object
  }

  static contextTypes = {
    theme: PropTypes.object.isRequired,
    muiTheme: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    CONF: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      preferredWidth: null,
      ...this.state
    }
  }

  handleWidthUpdate (width) {
    setTimeout(() => {
      this.setState({
        preferredWidth: width
      })
    }, 0)
  }

  renderPlayer () {
    const { CONF } = this.context
    const { expLoading, mainHeight, fullHeight, maxWidth, caption } = this.props
    const offset = caption && caption.offset_rm
    const loading = expLoading || !caption
    return (
      <ResponsivePlayer
        progressUpdateFrequency={CONF.VIDEO_PROGRESS_UPDATE_FREQUENCY}
        dataLoading={loading}
        maxWidth={maxWidth}
        mainHeight={mainHeight}
        fullHeight={fullHeight}
        offset={offset}
        onWidthUpdate={this.handleWidthUpdate}
      />
    )
  }

  renderTimeIndicator (background) {
    const { experiment } = this.props
    if (experiment) return <TimeIndicator experiment={experiment} style={{ background, ...TIME_INDICATOR_STYLE }} />
    else return null
  }

  renderControls (background) {
    const { experiment, isPlaying, expLoading } = this.props
    const { hovered } = this.state
    const showControls = !isPlaying || hovered
    return (
      <VideoControls
        style={{ ...CONTROLS_DIMENSIONS, background, opacity: showControls ? 1 : 0, width: '100%', left: 'auto', flexGrow: 0 }}
        experiment={experiment}
        expLoading={expLoading} />
    )
  }

  renderNoPlaces () {
    const { t } = this.context
    return <InfoFeedback style={{ background: 'transparent' }} message={t('experiment.no-place')}/>
  }

  render () {
    const { theme, muiTheme } = this.context
    const { preferredWidth } = this.state
    const { places } = this.props
    const background = theme.palette.controlsColor
    const style = {
      ...BOX_STYLE_BASE,
      flexBasis: preferredWidth,
      maxWidth: preferredWidth,
      ...transitionSlow
    }
    const noPlaces = places && places.length === 0
    let player = noPlaces ? this.renderNoPlaces() : this.renderPlayer()
    return (
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        style={{ flexGrow: 1, order: 1, display: 'flex', background: muiTheme.experiment.mediaBackground, position: 'relative' }}>
        <div
          style={style}>
          {player}
        </div>
        {this.renderTimeIndicator(background)}
        <div style={{ width: '100%', position: 'absolute', bottom: 0, zIndex: 10 }} >
          {this.renderControls(background)}
        </div>
      </div>
    )
  }
}

export default VideoBox
