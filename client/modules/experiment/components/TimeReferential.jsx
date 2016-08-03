import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import makeRange from 'lodash/range'
import TaskDisplayComputer from '../libs/TaskDisplayComputer'
import Sizer from '/imports/ui/Sizer'
import animateVB from '../libs/annimate-viewbox'
import { $ } from 'meteor/jquery'
import Paper from 'material-ui/Paper'

const MAGIC_MULTIPLE = 55.3

const MINUTES_DISPLAY_HEIGHT_PRCT = 12
const META_DISPLAY_HEIGHT_PRCT = 100 - MINUTES_DISPLAY_HEIGHT_PRCT
const META_DISPLAY_HEIGHT_OFFSET = 5
const META_DISPLAY_INNER_HEIGHT_PRCT = META_DISPLAY_HEIGHT_PRCT - META_DISPLAY_HEIGHT_OFFSET
const CURSOR_HEIGHT = META_DISPLAY_INNER_HEIGHT_PRCT

function intToPercent (int) {
  return `${int}%`
}

const defaultControls = {
  displayTasks: true,
  displayAnnotations: true,
  zoom: 1,
  cursor: 0
}

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

  componentDidMount () {

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
      updatedBounds ={
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
    this.animateMinutes(updatedBounds.lower, range, range * height / width )
  }

  render () {
    const { project, experiment, tasks, annotations, size, controls = defaultControls, style } = this.props
    const { theme } = this.context
    const { displayTasks, displayAnnotations, zoom, cursor } = controls
    const viewHeight = size.height
    const viewWidth = size.width
    console.info('COMPUTING TIME REFERENTIAL')
    console.info('SIZE = ', size)
    // General computations
    const range = experiment.duration / zoom

    const pxpm = viewWidth / experiment.duration
    console.info('PXPM', pxpm)
    const step = Math.ceil(25 / pxpm)
    const minutes = makeRange(1, Math.ceil(experiment.duration - 0.5), step)
    const computedMinutesStrokeWidth = 0.01 * MAGIC_MULTIPLE / pxpm
    const computedCursorStrokeWidth = 0.03 * MAGIC_MULTIPLE / pxpm
    const computedTextFontSize = 0.25 * MAGIC_MULTIPLE / pxpm
    // Task positioning computing
    const computer = new TaskDisplayComputer(tasks, experiment, project)
    const segments = computer.segs
    // uppper & lower
    this.updateInternals({
      rows: computer.nRows(),
      cannotSlideLeft:  cursor - range / 2 < 0,
      cannotSlideRight: cursor + range / 2 > experiment.duration,
      range
    })
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
          y2={intToPercent(META_DISPLAY_HEIGHT_PRCT)}
          y1='0'
          x2={minute}
          x1={minute}
          style={{ stroke: theme.palette.primary1Color }} />
      </g>))

    const tasksDisplay = displayTasks ? segments.map((segment) => {
      /* {{#hovercard template="_exp_panel_controller_taskHover" trigger="click" direction="vertical" }} */
      const segmentDisplay = ({ tskTypeId, width, index, start, taskType }) => (
        <rect
          key={`segment_${tskTypeId}_${start}`}
          width={width}
          height='1'
          rx='0.1'
          ry='0.1'
          y={`${index()}`}
          x={start}
          style={{ fill: taskType.color, strokeWidth: 0.015, stroke: 'rgb(0,0,0)' }}/>
      )
      return segmentDisplay(segment)
    }) : null

    const annotationsDisplay = displayAnnotations ? annotations.map((annotation) => {
      /* {{#hovercard template="_exp_panel_controller_annotationHover" trigger="click" direction="horizontal"}} */
      const displayAnnotation = (annotation) => {
        const { categories, rawMinutes } = annotation
        let categoriesDisplay
        if (categories.length) {
          categoriesDisplay = categories.map(({ color, _id }, index) => (
            <rect
              key={`annotation_${annotation._id}_${index}`}
              width='1'
              height='1'
              y={`${index}`}
              x='0'
              style={{ fill: color, strokeWidth: '0.015', stroke: 'rgb(0,0,0)' }}/>
          ))
        } else {
          categoriesDisplay = (<rect
            key={`annotation_${annotation._id}_${'none'}`}
            x={rawMinutes}
            y='0'
            height='100%'
            width='0.1'
            fill='#CCCCCC'/>)
        }
        return (
          <svg
            key={`annotation_${annotation._id}`}
            x={rawMinutes}
            y='0'
            height='100%'
            width='0.1'
            viewBox={`0 0 1 ${categories.length || 1}`}
            preserveAspectRatio='none'>
            {categoriesDisplay}
          </svg>
        )
      }
      return displayAnnotation(annotation)
    }) : null

    return (
        <Paper rounded={false} zDepth={2} style={{ flexGrow: 1, flexBasis: '100%', maxWidth: '100%', ...style }}>
          <svg
            id='time-referential-svg-root'
            height={viewHeight}
            width={viewWidth}>
            <rect
              id='svg-ruler'
              fill={theme.palette.primary1Color}
              width='100%'
              height={intToPercent(MINUTES_DISPLAY_HEIGHT_PRCT)}
              y={intToPercent(META_DISPLAY_HEIGHT_PRCT)} />
            {/* Minutes and cursor display */}
            <svg className='scalable-svg-minutes-viewport' preserveAspectRatio='none'>
              <g fontSize={computedTextFontSize}>
                {minuteDisplay}
                {/* Cursor */}
                <g style={{ stroke: theme.palette.textColor }} transform={`translate(${cursor})`}>
                  <g strokeWidth={computedCursorStrokeWidth}>
                    <line
                      fill='black'
                      y1='0'
                      y2={intToPercent(CURSOR_HEIGHT)}
                      x1='0'
                      x2='0' />
                  </g>
                  <g transform={`translate(${-5 * computedCursorStrokeWidth})`}>
                    <svg
                      y={intToPercent(CURSOR_HEIGHT)}
                      preserveAspectRatio='none'
                      viewBox='-1 0 2 1'
                      width={10 * computedCursorStrokeWidth}
                      height='5%'>
                      <polygon fill={theme.palette.textColor} strokeWidth='0' points='-1,1 1,1 0,0' />
                    </svg>
                  </g>
                </g>
              </g>
            </svg>
            {/* Meta display */}
            <svg
              preserveAspectRatio='none'
              className='scalable-svg-meta-viewport'
              height={intToPercent(META_DISPLAY_INNER_HEIGHT_PRCT)}
              y={intToPercent(META_DISPLAY_HEIGHT_OFFSET)}>
              {/* Tasks display */}
              <g fillOpacity='0.5'>
                {tasksDisplay}
              </g>
              {/* Annotations display
               Translate used to center annotation in their width middle */}
              <g transform='translate(-0.05)'>
                <g>
                  {annotationsDisplay}
                </g>
              </g>
            </svg>
          </svg>
        </Paper>
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
