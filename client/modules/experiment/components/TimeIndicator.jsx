import React, { PropTypes, Component } from 'react'
import { fInlineNoWrapCentered } from '/imports/styles'
import IconButton from 'material-ui/IconButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FontIcon from 'material-ui/FontIcon'
import { ABSOLUTE_TIME_MODE, RELATIVE_TIME_MODE } from '../libs/time-modes'
import { readableAbsoluteTime, readableRelativeTime } from '../libs/cursor-time'
import Chip from 'material-ui/Chip'
import { fInlineAround } from '/imports/styles'
import autobind from 'autobind-decorator'

const SelectableIconButton = ({ selected, iconClass, style, ...props }, { theme }) => (
  <FloatingActionButton secondary={true} mini={true} style={style}
    {...props}>
    <FontIcon className={iconClass}/>
  </FloatingActionButton>
)

@autobind
class CursorTimeView extends Component {

  static TIME_MATCHER = /^(\d{1,2})h(\d{1,2}).(\d{1,2})$/

  constructor ({ experiment }) {
    super(...arguments)
    this.state = {
      begin: 0
    }
  }

  componentWillReceiveProps ({ experiment }) {
    const begin = new Date(0)
    const time = CursorTimeView.TIME_MATCHER.exec(experiment.time)
    if (time != null) begin.setHours(Number.parseInt(time[1]), Number.parseInt(time[2]), Number.parseInt(time[3]))
    this.setState({
      begin
    })
  }

  selectAbsolute () {
    const { selectTimeMode } = this.props
    selectTimeMode(ABSOLUTE_TIME_MODE)
  }

  selectRelative () {
    const { selectTimeMode } = this.props
    selectTimeMode(RELATIVE_TIME_MODE)
  }

  render () {
    const { timeMode, cursor, style } = this.props
    const isAbsolute = timeMode === ABSOLUTE_TIME_MODE
    const button = <SelectableIconButton onClick={ isAbsolute ? this.selectRelative : this.selectAbsolute}
                                         iconClass={ isAbsolute ? 'fa fa-clock-o' : 'fa fa-hourglass-half' } />

    const { begin } = this.state
    let inner
    if (timeMode === ABSOLUTE_TIME_MODE) {
      inner = readableAbsoluteTime(cursor, begin)
    } else inner = readableRelativeTime(cursor)
    return (
      <div style={{ ...fInlineAround, justifyContent: 'space-between', padding: 5, ...style }}>
        <span style={{ textAlign: 'center', flexGrow: 1 }}>{inner}</span>
        {button}
      </div>
    )
  }
}

SelectableIconButton.contextTypes = {
  theme: PropTypes.object.isRequired
}

const TimeIndicator = ({ cursor, timeMode, selectTimeMode, experiment, style }, { theme }) => {
  return (
    <CursorTimeView style={{ fontSize: 25, width: 230, fontFamily: 'monospace', color: theme.palette.alternateTextColor, ...style }}
                    experiment={experiment}
                    timeMode={timeMode}
                    cursor={cursor}
                    selectTimeMode={selectTimeMode}/>
  )
}

TimeIndicator.propTypes = {
  experiment: PropTypes.object.isRequired,
  cursor: PropTypes.number.isRequired,
  timeMode: PropTypes.string.isRequired,
  selectTimeMode: PropTypes.func.isRequired
}

TimeIndicator.contextTypes = {
  theme: PropTypes.object.isRequired
}

export default TimeIndicator

