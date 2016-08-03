import React, { PropTypes, Component } from 'react'
import { fInlineNoWrapCentered } from '/imports/styles'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import { ABSOLUTE_TIME_MODE, RELATIVE_TIME_MODE } from '../libs/time-modes'
import { readableAbsoluteTime, readableRelativeTime } from '../libs/cursor-time'

const SelectableIconButton = ({ selected, iconClass, ...props }, { theme }) => (
  <IconButton style={{ borderBottomWidth: selected ? '4px' : 0, borderBottomColor: theme.palette.accent1Color, borderBottomStyle: 'solid' }}
    {...props}>
    <FontIcon className={iconClass}/>
  </IconButton>
)

const timeMatcher = /^(\d{1,2})h(\d{1,2}).(\d{1,2})$/

class CursorTimeView extends Component {
  constructor ({ experiment }) {
    super(...arguments)
    this.state = {
      begin: 0
    }
  }

  componentWillReceiveProps ({ experiment }) {
    const begin = new Date(0)
    const time = timeMatcher.exec(experiment.time)
    if (time != null) begin.setHours(Number.parseInt(time[1]), Number.parseInt(time[2]), Number.parseInt(time[3]))
    this.setState({
      begin
    })
  }

  render () {
    const { timeMode, cursor, style } = this.props
    const { begin } = this.state
    if (timeMode === ABSOLUTE_TIME_MODE) return <div style={style}>{readableAbsoluteTime(cursor, begin)}</div>
    else return <div style={style}>{readableRelativeTime(cursor)}</div>
  }
}

SelectableIconButton.contextTypes = {
  theme: PropTypes.object.isRequired
}

const TimeIndicator = ({ cursor, timeMode, selectTimeMode, experiment }, { theme }) => {
  return (
    <div style={{ ...fInlineNoWrapCentered, justifyContent: 'center', flexGrow: 1 }}>
      <SelectableIconButton onClick={() => selectTimeMode(ABSOLUTE_TIME_MODE)} selected={timeMode === ABSOLUTE_TIME_MODE} iconClass='fa fa-clock-o'/>
      <SelectableIconButton onClick={() => selectTimeMode(RELATIVE_TIME_MODE)} selected={timeMode === RELATIVE_TIME_MODE} iconClass='fa fa-hourglass-half'/>
      <CursorTimeView style={{ flexBasis: 120 }} experiment={experiment} timeMode={timeMode} cursor={cursor} />
    </div>)
}

TimeIndicator.propTypes = {
  experiment: PropTypes.object.isRequired,
  cursor: PropTypes.number.isRequired,
  timeMode: PropTypes.string.isRequired,
  selectTimeMode: PropTypes.func.isRequired
}

export default TimeIndicator

