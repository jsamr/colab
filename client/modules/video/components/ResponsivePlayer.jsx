import React, { PropTypes, Component } from 'react'
import ReactPlayer from 'react-player'
import SimpleLoading from '/imports/ui/SimpleLoading'
import autobind from 'autobind-decorator'
import { transitionSlow } from '/imports/styles'
import { $ } from 'meteor/jquery'

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
      playerLoading: true,
      height: null,
      cachedHeight: 0
    }
  }

  componentWillReceiveProps ({ userCursor, mainHeight, fullHeight }) {
    let newState = {}
    let shouldUpdate = false
    if (userCursor !== this.state.userCursor) {
      shouldUpdate = true
      newState.userCursor = userCursor
    }
    if (mainHeight !== this.props.mainHeight) {
      shouldUpdate = true
      if (this._container) {
        const newHeight = this._container.getBoundingClientRect().height
        if (fullHeight) {
          // apply transformation to cached height
          newState.cachedHeight = mainHeight / this.props.mainHeight * this.state.cachedHeight
        }
        newState.height = newHeight
      }
    }
    if (fullHeight !== this.props.fullHeight) {
      shouldUpdate = true
      if (fullHeight) {
        newState = { ...newState, cachedHeight: this.state.height, height: mainHeight }
      } else {
        newState = { ...newState, height: this.state.cachedHeight }
      }
    }
    if (shouldUpdate) this.setState(newState)
  }

  componentWillUpdate (nextProp, { userCursor, videoRatio }) {
    // TODO check if this operation is costy
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
    if (player) {
      const rPlayer = player.refs.player
      this._playerEl = rPlayer.refs.player
      this._playerEl.addEventListener('loadedmetadata', this.handleLoadedMetaData)
    }
  }

  componentWillUnmount () {
    this._player = null
  }

  computeWidthBasis () {
    const { maxWidth } = this.props
    const { videoRatio, height } = this.state
    return {
      width: Math.min(height * videoRatio, maxWidth),
      height
    }
  }

  handleLoadContainer (container) {
    this._container = container
    if (container){
      this.setState({
        containerLoading: false,
        height: container.getBoundingClientRect().height
      })
    }
  }

  render () {
    const { isPlaying, volumeLevel, dataLoading, style, maxWidth, progressUpdateFrequency = 50 } = this.props
    const { containerLoading, playerLoading } = this.state
    const loading = containerLoading || playerLoading || dataLoading
    const { width, height } = loading ? { width: maxWidth, height: 'auto' } : this.computeWidthBasis()
    return (
      <div className='videoContainer'
           ref={this.handleLoadContainer}
           style={{ flexBasis: width, ...transitionSlow, ...style }} >
        <div style={{ position: 'relative', display: loading ? 'none' : 'flex' }}>
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
            progressFrequency={progressUpdateFrequency}
            className='fastTransition'
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
  dataLoading: PropTypes.bool.isRequired,
  mainHeight: PropTypes.number,
  fullHeight: PropTypes.bool,
  progressUpdateFrequency: PropTypes.number
}

export default ResponsivePlayer
