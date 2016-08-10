import React, { PropTypes, Component } from 'react'
import FontIcon from 'material-ui/FontIcon'
import { fInlineAround, fInlineNoWrap, fColumnNoWrapCenter } from '/imports/styles'
import ToggleAnnotations from '/imports/ui/controls/ToggleAnnotations'
import ToggleTasks from '/imports/ui/controls/ToggleTasks'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FlatButton from 'material-ui/FlatButton'
import autobind from 'autobind-decorator'

const ControlLine = ({ children }) => <div style={{ ...fInlineAround, margin: '0 10px', flexGrow: 1 }}>{children}</div>

ControlLine.propTypes = {
  children: PropTypes.node
}

const Button = ({ children, ...props }) => <FloatingActionButton secondary={true} mini={true} {...props} >{children}</FloatingActionButton>

Button.propTypes = {
  children: PropTypes.node
}

@autobind
class ZoomButton extends Component {

  static intervals = [ 0, 150, 130, 110, 100, 80, 50, 20, 10 ]

  static propTypes = {
    fontIconClass: PropTypes.string.isRequired,
    operation: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this._updater = null
    this._iteration = 0
  }

  getNextIterationStep () {
    const iLength = ZoomButton.intervals.length
    if (this._iteration > iLength - 1) {
      return ZoomButton.intervals[iLength - 1]
    } else return ZoomButton.intervals[this._iteration]
  }

  handleStop () {
    clearTimeout(this._updater)
    this._iteration = 0
  }

  handleStart () {
    const { operation } = this.props
    this._updater = setTimeout(() => {
      operation()
      this._iteration++
      this.handleStart()
    }, this.getNextIterationStep())
  }

  render () {
    const { fontIconClass, operation, experiment, ...props } = this.props
    return (
      <Button
        onMouseDown={this.handleStart}
        onMouseUp={this.handleStop}
        onTouchStart={this.handleStart}
        onTouchEnd={this.handleStop}
        onTouchCancel={this.handleStop}
        onMouseLeave={this.handleStop}
        {...props}
      >
        <FontIcon className={fontIconClass} />
      </Button>
    )
  }
}

const TimeControls = ({ controls, style, setTimeLineAnnotationsVisibility, setTimeLineZoom, setTimeLineTasksVisibility, experiment }) => {
  let { zoom, displayTasks, displayAnnotations, timeLineVisible } = controls
  return (
    <div style={{ ...fInlineNoWrap, flexBasis: 350, ...style, display: timeLineVisible ? 'flex' : 'none' }}>
      <ControlLine>
        <Button onClick={() => setTimeLineAnnotationsVisibility(!displayAnnotations)}>
          <ToggleAnnotations visible={displayAnnotations} />
        </Button>
        <Button onClick={() => setTimeLineTasksVisibility(!displayTasks)}>
          <ToggleTasks visible={displayTasks} />
        </Button>
      </ControlLine>
      <ControlLine>
        <ZoomButton
          experiment={experiment}
          disabled={zoom <= 1}
          operation={() => setTimeLineZoom(zoom - 0.1)}
          fontIconClass='fa fa-search-minus'
        />
        <FlatButton secondary={true} disabled={zoom <= 1}
                    onClick={() => setTimeLineZoom(1)}>
          <div style={fColumnNoWrapCenter}>
            <div>X {zoom.toPrecision(3)}</div>
          </div>
        </FlatButton>
        <ZoomButton
          experiment={experiment}
          operation={() => setTimeLineZoom(zoom + 0.1)}
          fontIconClass='fa fa-search-plus'
        />

      </ControlLine>
    </div>
  )
}

TimeControls.propTypes = {
  style: PropTypes.object,
  controls: PropTypes.object.isRequired,
  setTimeLineAnnotationsVisibility: PropTypes.func.isRequired,
  setTimeLineZoom: PropTypes.func.isRequired,
  setTimeLineTasksVisibility: PropTypes.func.isRequired,
  experiment: PropTypes.object.isRequired
}

export default TimeControls
