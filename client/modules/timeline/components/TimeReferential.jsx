import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import makeRange from 'lodash/range'
import TaskDisplayComputer from '../libs/TaskDisplayComputer'
import Sizer from '/imports/ui/Sizer'
import animateVB from '../libs/annimate-viewbox'
import { $ } from 'meteor/jquery'
import TaskSegment from './TaskSegment'
import AnnotationDisplay from './AnnotationDisplay'
import Cursor from './Cursor'
import reverse from 'lodash/reverse'

const MAGIC_MULTIPLE = 55.3

const defaultControls = {
  displayTasks: true,
  displayAnnotations: true,
  zoom: 1,
  cursor: 0
}

const Container = ({ style, children }) => <div style={{ flexGrow: 1, flexBasis: '100%', maxWidth: '100%', ...style }}>{children}</div>

class TimeReferential extends Component {

  constructor (props) {
    super(props)
    const findNode = () => $(ReactDOM.findDOMNode(this))
    this.state = {
      rows: 0,
      lower: 0,
      upper: 0,
      pxpm: 0,
      cannotSlideRight: false,
      cannotSlideLeft: false
    }
    this.updateInternals = this.updateInternals.bind(this)
    this.animateMeta = animateVB(() => findNode().find('.scalable-svg-meta-viewport'), this.props.experiment.duration)
    this.animateMinutes = animateVB(() => findNode().find('.scalable-svg-minutes-viewport'), this.props.experiment.duration)
  }

  updateInternals (internals) {
    const { cursor } = this.props.controls || defaultControls
    const { duration } = this.props.experiment
    const { width, height } = this.props.size
    const {
      cannotSlideRight,
      cannotSlideLeft,
      range,
      rows
    } = internals
    let updatedBounds
    const halfRange = range / 2
    if (cannotSlideRight && cannotSlideLeft) {
      updatedBounds = {
        upper: cursor + halfRange,
        lower: cursor - halfRange
      }
    } else if (cannotSlideRight) {
      updatedBounds = {
        upper: duration,
        lower: duration - range
      }
    } else {
      updatedBounds = {
        upper: range,
        lower: 0
      }
    }
    this.animateMeta(updatedBounds.lower, range, rows)
    this.animateMinutes(updatedBounds.lower, range, range * height / width)
  }

  render () {
    const { project, experiment, tasks, annotations, size, controls = defaultControls, style } = this.props
    const { theme } = this.context
    const { displayTasks, displayAnnotations, zoom, cursor } = controls
    const viewHeight = size.height
    const viewWidth = size.width
    if (viewWidth === 0) return <Container style={style}>LOADING</Container>
    // General computations
    const range = experiment.duration / zoom
    // pxpm = pixels per minute
    const pxpm = viewWidth / experiment.duration * zoom
    const step = Math.ceil(25 / pxpm)
    const minutes = makeRange(1, Math.ceil(experiment.duration - 0.5), step)
    const computedMinutesStrokeWidth = 0.01 * MAGIC_MULTIPLE / pxpm
    const computedCursorStrokeWidth = 0.03 * MAGIC_MULTIPLE / pxpm
    const computedTextFontSize = 0.25 * MAGIC_MULTIPLE / pxpm
    // Task positioning computing
    const computer = new TaskDisplayComputer(tasks, experiment, project)
    const segments = computer.segs
    const minutesDisplayHeightPx = 24
    const annotationsDisplayHeightPx = 30
    const metaDisplayHeightPx = viewHeight - minutesDisplayHeightPx
    const tasksDisplayInnerHeightPx = metaDisplayHeightPx - annotationsDisplayHeightPx

    // uppper & lower
    this.updateInternals({
      rows: computer.nRows(),
      cannotSlideLeft: cursor - range / 2 < 0,
      cannotSlideRight: cursor + range / 2 > experiment.duration,
      range
    })
    // window view port to embed xhtml elements
    const htmlViewBox = `0 0 ${viewWidth} ${viewHeight}`
    const minuteDisplay = minutes.map((minute) => (
      <g key={`minute_${minute}`}
         strokeWidth={computedMinutesStrokeWidth}>
        <text
          color={theme.palette.textColor}
          fill={theme.palette.textColor}
          fontFamily='Verdana'
          y='98%'
          x={minute}>
          {minute}'
        </text>
        <line
          className='minute'
          y2={metaDisplayHeightPx}
          y1='0'
          x2={minute}
          x1={minute}
          style={{ stroke: theme.palette.primary1Color }} />
      </g>))

    const tasksDisplay = displayTasks ? segments.map((segment) => {
      /* {{#hovercard template="_exp_panel_controller_taskHover" trigger="click" direction="vertical" }} */
      const segmentDisplay = ({ tskTypeId, width, index, start, taskType }) => (
        <TaskSegment key={`segment_${tskTypeId}_${start}`}
                     taskType={taskType}
                     style={{ fill: taskType.color, strokeWidth: 0, stroke: 'rgb(0,0,0)' }}
                     width={width}
                     height='0.8'
                     y={`${index() + 0.1}`}
                     x={start}
        />
      )
      return segmentDisplay(segment)
    }) : null

    // reverse in order to avoid floating elements on hover boxes
    const annotationsDisplay = displayAnnotations ? reverse(annotations).map((annotation) => <AnnotationDisplay viewBox={htmlViewBox} key={`annotation_${annotation._id}`} annotation={annotation} />) : null

    return (
      <Container style={style}>
        <svg
          id='time-referential-svg-root'
          height={viewHeight}
          width={viewWidth}>
          {/* minutes background rectangle */}
          <rect
            id='svg-ruler'
            fill={theme.palette.primary1Color}
            width='100%'
            height={minutesDisplayHeightPx}
            y={metaDisplayHeightPx} />
          {/* Minutes display */}
          <svg className='scalable-svg-minutes-viewport' preserveAspectRatio='none' >
            <g fontSize={computedTextFontSize}>
              {minuteDisplay}
            </g>
          </svg>
          {/* Tasks display */}
          <g>
            <svg
              preserveAspectRatio='none'
              className='scalable-svg-meta-viewport'
              height={tasksDisplayInnerHeightPx}
              y={annotationsDisplayHeightPx}
            >
              <g fillOpacity='0.8'>
                {tasksDisplay}
              </g>
            </svg>
          </g>
          <rect height={annotationsDisplayHeightPx}
                y={0}
                width='100%'
                fill='rgba(40, 40, 40, 0.6)'
          />
          <svg
            preserveAspectRatio='none'
            className='scalable-svg-minutes-viewport'
            height={metaDisplayHeightPx}
            y='0'>
            >
            {/* Annotations display
             Translate used to center annotation in their width middle */}
            <g>
              <g>
                {annotationsDisplay}
              </g>
            </g>
          </svg>
          {/* Cursor display */}
          <svg className='scalable-svg-minutes-viewport' preserveAspectRatio='none' >
            <Cursor cursor={cursor} strokeWidth={computedCursorStrokeWidth} height={metaDisplayHeightPx / viewHeight} y={annotationsDisplayHeightPx / viewHeight}/>
          </svg>
        </svg>
      </Container>
    )
  }
}

TimeReferential.propTypes = {
  project: PropTypes.object.isRequired,
  experiment: PropTypes.object.isRequired,
  annotations: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
  size: PropTypes.object.isRequired,
  controls: PropTypes.object.isRequired
}

TimeReferential.contextTypes = {
  theme: PropTypes.object.isRequired
}

export default Sizer(TimeReferential)
