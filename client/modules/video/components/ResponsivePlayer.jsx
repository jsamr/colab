import React, { PropTypes, Component } from 'react'
import ReactPlayer from 'react-player'
import SimpleLoading from '/imports/ui/SimpleLoading'
import autobind from 'autobind-decorator'
import { transitionSlow } from '/imports/styles'
@autobind
class VideoContainer extends Component {

  constructor (props) {
    super(props)
    this._player = { prevPlayed: 0 }
    this.state = {
      userCursor: 0,
      duration: 0,
      videoRatio: 0,
      containerLoading: true,
      playerLoading: true
    }
  }

  componentWillReceiveProps ({ userCursor }) {
    if (userCursor !== this.state.userCursor) {
      this.setState({ userCursor })
    }
  }

  componentWillUpdate (nextProp, { userCursor, videoRatio }) {
    if (userCursor !== this.state.userCursor) {
      if (userCursor !== this._player.prevPlayed) this._player.seekTo(userCursor)
    }
  }

  handleOnProgress ({ played, loaded }) {
    const { autoUpdateCursor } = this.props
    const { duration } = this.state
    autoUpdateCursor({ cursorSec: duration * played, played, loaded })
  }

  handleOnDuration (duration) {
    const { autoUpdateDuration } = this.props
    this.setState({
      duration
    })
    autoUpdateDuration(duration)
  }

  handleReachEnd () {
    const { setPlayingState } = this.props
    setPlayingState(false)
  }

  handleLoadedMetaData (e) {
    const playerEl = e.target
    const { videoHeight, videoWidth } = playerEl
    if (videoWidth && videoHeight) {
      this.setState({
        videoRatio: videoWidth / videoHeight,
        playerLoading: false
      })
    }
  }

  handlePlayerMount (player) {
    this._player = player
    const rPlayer = player.refs.player
    this._playerEl = rPlayer.refs.player
    this._playerEl.addEventListener('loadedmetadata', this.handleLoadedMetaData)
  }

  componentWillUnmount () {
    this._player = null
  }

  computeWidthBasis () {
    const { maxWidth } = this.props
    const { videoRatio } = this.state
    const height = this._container.offsetHeight
    return {
      width: Math.min(height * videoRatio, maxWidth),
      height
    }
  }

  handleLoadContainer (container) {
    this._container = container
    this.setState({
      containerLoading: false
    })
  }

  render () {
    const { isPlaying, volumeLevel, dataLoading, style, maxWidth, ...props } = this.props
    const { containerLoading, playerLoading } = this.state
    const loading = containerLoading || playerLoading || dataLoading
    const { width, height } = loading ? { width: maxWidth, height: 'auto' } : this.computeWidthBasis()
    return (
      <div ref={this.handleLoadContainer} style={{ flexBasis: width, ...transitionSlow, ...style }} {...props}>
        <div style={{ position: 'relative', display: loading ? 'none' : 'block'  }}>
          <ReactPlayer
            ref={this.handlePlayerMount}
            controls={false}
            url='http://www.w3schools.com/html/mov_bbb.ogg'
            width={width}
            height={height}
            volume={volumeLevel}
            playing={isPlaying}
            onProgress={this.handleOnProgress}
            onDuration={this.handleOnDuration}
            onEnded={this.handleReachEnd}
            progressFrequency={50}
          />
        </div>
        <SimpleLoading style={{ margin: 'auto', textAlign: 'center', display: loading ? null : 'none' }} />
      </div>
    )
  }
}

const ResponsivePlayer = VideoContainer

ResponsivePlayer.propTypes = {
  autoUpdateCursor: PropTypes.func.isRequired,
  autoUpdateDuration: PropTypes.func.isRequired,
  setPlayingState: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  userCursor: PropTypes.number.isRequired,
  volumeLevel: PropTypes.number.isRequired,
  maxWidth: PropTypes.number.isRequired,
  dataLoading: PropTypes.bool.isRequired
}

export default ResponsivePlayer
