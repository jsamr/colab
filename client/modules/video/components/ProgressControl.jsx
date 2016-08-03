import React, { PropTypes, Component } from 'react'
import Icon from 'material-ui/FontIcon'
import autobind from 'autobind-decorator'

function getRelativeClickPosition (target, clientX) {
  var rect = target.getBoundingClientRect()
  return (clientX - rect.left) / rect.width
}

class MouseListener extends Component {
  handleClick (event) {
    this.props.handleUserRequest(getRelativeClickPosition(event.currentTarget, event.clientX))
  }
  render () {
    return (
      <div onClick={this.handleClick.bind(this)} style={{ position: 'absolute', zIndex: 2, height: '100%', width: '100%', background: 'transparent', cursor: 'pointer' }}></div>
    )
  }
}

const SimpleCursor = ({ fontSize, color }) => (
  <div style={{ position: 'relative', zIndex: 11, cursor: 'pointer', fontSize }} >
    <Icon className='fa fa-circle' style={{ position: 'absolute', right: '-0.5em', top: '-0.25em', color, fontSize: 'inherit', zIndex: 10 }}/>
  </div>
)

@autobind
class DraggableCursor extends Component {

  constructor (props) {
    super(props)
    this.state = {
      dragging: false,
      dragLeftOffset: 0,
      computedOffset: 0
    }
  }

  handleTouchStart (event) {
    event.preventDefault()
    this.onDragStart(event)
  }

  handleMouseDown (event) {
    event.preventDefault()
    this.onDragStart(event)
  }

  onHandleMouseMove (event) {
    this.handleCursorUpdate(event.clientX)
  }

  onDragStart () {
    this.setState({
      dragging: true
    })
    window.addEventListener('mousemove', this.onHandleMouseMove)
    window.addEventListener('mouseup', this.onDragStop)
    window.addEventListener('touchstop', this.onDragStop)
  }

  componentWillReceiveProps (props) {
     const{ dragging } = this.state
    if (!dragging) {
      this.setState({
        dragLeftOffset: `${props.fallbackCursorOffset * 100}%`
      })
    }
  }

  onDragStop () {
    window.removeEventListener('mousemove', this.onHandleMouseMove)
    window.removeEventListener('mouseup', this.onDragStop)
    window.removeEventListener('touchstop', this.onDragStop)
    this.setState({
      dragging: false
    })
  }

  handleCursorUpdate (clientX) {
    const requiredPosition = Math.max(0, Math.min(1, getRelativeClickPosition(this.props.containerRef, clientX)))
    this.setState({
      dragLeftOffset: `${requiredPosition * 100}%`
    })
    this.props.onCursorUpdate(requiredPosition)
  }

  render () {
    const { color, style, fontSize } = this.props
    const { dragging, dragLeftOffset } = this.state
    const draggableGhostColor = dragging ? 'white' : color
    return (
      <div style={{ position: 'absolute', height: '100%', width: dragLeftOffset }}>
        <div style={{ zIndex: 12, position: 'relative', cursor: 'pointer', color: draggableGhostColor, fontSize, ...style }}
             onMouseDown={this.handleMouseDown}
             onTouchStart={this.handleTouchStart} >
          <Icon className='fa fa-circle' style={{ position: 'absolute', color: 'inherit', right: '-0.5em', top: '-0.25em', fontSize: 'inherit', zIndex: 10 }}/>
        </div>
      </div>
    )
  }

}

DraggableCursor.propTypes = {
  onCursorUpdate: PropTypes.func.isRequired,
  containerRef: PropTypes.node.isRequired,
  fallbackCursorOffset: PropTypes.number.isRequired
}

MouseListener.propTypes = {
  handleUserRequest: PropTypes.func.isRequired
}

class VideoSlidebar extends Component {

  constructor (props) {
    super(props)
    this.state = {
      durationEl: null
    }
  }

  componentDidMount () {
    if (this.state.durationEl == null) {
      this.setState({
        durationEl: this.refs.duration
      })
    }
  }

  render () {
    const { theme } = this.context
    const { durationEl } = this.state
    const { played, loaded, userSelectPlayerCursor, style = {} } = this.props
    const cursorColor = theme.palette.primary1Color
    const width = `${played * 100}%`
    const draggable = durationEl ? <DraggableCursor fontSize={25}
                                                    fallbackCursorOffset={played}
                                                    color={cursorColor}
                                                    containerRef={durationEl}
                                                    onCursorUpdate={userSelectPlayerCursor}
    /> : null
    return (
      <div style={{ flexGrow: 1, position: 'relative', height: 10, ...style, background: 'white' }}>
        {/* duration */}
        <div ref='duration' style={{ position: 'absolute', background: theme.palette.headerColor, height: '100%', width: '100%' }}></div>
        {/* Dragger */}
        {draggable}
        {/* buffer */}
        <div style={{ position: 'absolute', background: 'grey', height: '100%', width: `${loaded * 100}%` }}></div>
        {/* cursor */}
        <div style={{ position: 'absolute', background: cursorColor, height: '100%', width: width }}>
          <SimpleCursor color={cursorColor} fontSize={22} />
        </div>
        {/* Mouse listener */}
        <MouseListener handleUserRequest={userSelectPlayerCursor} />
      </div>
    )
  }
}

VideoSlidebar.propTypes = {
  loaded: PropTypes.number.isRequired,
  played: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  userSelectPlayerCursor: PropTypes.func.isRequired,
  style: PropTypes.object
}

VideoSlidebar.contextTypes = {
  theme: PropTypes.object.isRequired
}

export default VideoSlidebar