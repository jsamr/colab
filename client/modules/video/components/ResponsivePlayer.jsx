import React, { PropTypes, Component } from 'react'
import ReactPlayer  from 'react-player'
import SimpleLoading from '/imports/ui/SimpleLoading'
import autobind from 'autobind-decorator'
import { transitionSlow } from '/imports/styles'
import { $ } from 'meteor/jquery'
import NotFound from '/imports/ui/NotFound'

@autobind
class VideoContainer extends Component {

  static propTypes = {
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
    progressUpdateFrequency: PropTypes.number,
    url: PropTypes.string,
    offsetRM: PropTypes.number,
    onLoad: PropTypes.func,
    onWidthUpdate: PropTypes.func,
    style: PropTypes.object
  }

  static contextTypes = {
    t: PropTypes.func.isRequired
  }

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
      cachedHeight: 0,
      error: null
    }
  }

  componentWillReceiveProps ({ userCursor, mainHeight, fullHeight, url }) {
    let newState = {}
    let shouldUpdate = false
    if (userCursor !== this.state.userCursor) {
      shouldUpdate = true
      newState.userCursor = userCursor
    }

    if (url !== this.props.url) {
      shouldUpdate = true
      newState.error = null
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
    const { onLoad } = this.props
    if (videoWidth && videoHeight) {
      this.setState({
        videoRatio: videoWidth / videoHeight,
        playerLoading: false
      })
      if (onLoad) onLoad(true)
    }
  }

  handlePlayerMount (player) {
    this._player = player
    const { onLoad } = this.props
    if (player) {
      const rPlayer = player.refs.player
      this._playerEl = rPlayer.refs.player
      this._playerEl.addEventListener('loadedmetadata', this.handleLoadedMetaData)
    } else {
      if (onLoad) onLoad(false)
    }
  }

  componentWillUnmount () {
    this._player = null
  }

  computeWidthBasis () {
    const { maxWidth, onWidthUpdate } = this.props
    const { videoRatio, height } = this.state
    const width = Math.min(height * videoRatio, maxWidth)
    if (onWidthUpdate) onWidthUpdate(width)
    return {
      width,
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

  handleError (error) {
    this.setState({
      error: true
    })
  }

  renderLoading (display) {
    return <SimpleLoading style={{ alignItems: 'center', justifyContent: 'center', height: '100%', display }} />
  }

  render () {
    const { isPlaying, volumeLevel, dataLoading, style, maxWidth, url, offsetRM, progressUpdateFrequency = 50 } = this.props
    const { containerLoading, playerLoading, error, duration } = this.state
    const { t } = this.context
    const loading = containerLoading || playerLoading || dataLoading
    const { width, height } = loading ? { width: maxWidth, height: 'auto' } : this.computeWidthBasis()
    if (url == null) return this.renderLoading('flex')
    if (error != null) return <NotFound message={ t('medianode.notfound') } />
    return (
      <div className='videoContainer'
           ref={this.handleLoadContainer}
           style={{ flexBasis: width, ...transitionSlow, ...style }} >
        <div style={{ position: 'relative', display: loading ? 'none' : 'flex' }}>
          <ReactPlayer
            ref={this.handlePlayerMount}
            controls={false}
            url={url}
            width={width}
            height={height}
            volume={volumeLevel}
            playing={isPlaying}
            onProgress={this.handleOnProgress}
            onDuration={this.handleOnDuration}
            onEnded={this.handleReachEnd}
            onError={this.handleError}
            startOffset={offsetRM * 60}
            progressFrequency={progressUpdateFrequency}
            style={transitionSlow}
          />
        </div>
        {this.renderLoading(loading ? 'flex' : 'none')}
      </div>
    )
  }

}

const ResponsivePlayer = VideoContainer

export default ResponsivePlayer
