import React, { PropTypes } from 'react'
import Hoverable from '/imports/ui/Hoverable'
import { transitionFast } from '/imports/styles'
class Cursor extends Hoverable {

  static contextTypes = {
    theme: PropTypes.object.isRequired
  }

  static propTypes = {
    strokeWidth: PropTypes.number.isRequired,
    cursor: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }

  render () {
    const { theme } = this.context
    const { strokeWidth, cursor, y, height } = this.props
    const { hovered } = this.state
    const yPct = `${y * 100}%`
    const heightPct = `${height * 100}%`
    return (
      <g style={{ stroke: theme.palette.textColor }} transform={`translate(${cursor})`}>
        <g strokeWidth={strokeWidth}>
          <line
            fill='black'
            y1={yPct}
            y2={heightPct}
            x1='0'
            x2='0' />
          <circle cy='50%'
                  r={ hovered ? strokeWidth * 8 : strokeWidth * 7 }
                  style={{ cursor: 'pointer', fill: theme.palette.primary1Color, ...transitionFast }}
                  onMouseEnter={this.onMouseEnter}
                  onMouseLeave={this.onMouseLeave}
          />
        </g>
      </g>
    )
  }
}

export default Cursor
