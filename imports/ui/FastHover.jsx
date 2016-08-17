import React, { PropTypes } from 'react'

const COMMON_STYLE = {
  minWidth: 200,
  padding: 10
}

const CONTAINER_STYLE = {
  ...COMMON_STYLE,
  position: 'absolute',
  left: '100%',
  top: 0,
  width: '65%',
  zIndex: 1000
}

const Arrow = ({ arrowSize, arrowColor, style }) => (
  <div style={{ ...ARROW_STYLE,
    borderTop: `${arrowSize}px solid transparent`,
    borderBottom: `${arrowSize}px solid transparent`,
    borderRight: `${arrowSize}px solid ${arrowColor}`,
    position: 'absolute',
    left: -1 * arrowSize,
    top: 5,
    ...style
  }} />
)

Arrow.propTypes = {
  arrowSize: PropTypes.number.isRequired,
  arrowColor: PropTypes.string.isRequired,
  style: PropTypes.object
}

const ARROW_STYLE = {
  width: 0,
  height: 0
}

function getThemeStyling (theme) {
  return {
    background: theme.palette.textColor,
    color: theme.palette.primary1Color
  }
}

const SvgHover = ({ children, arrowSize = 10,  style }, { theme }) => (
  <div style={{ ...COMMON_STYLE, marginLeft: 3, ...style, ...getThemeStyling(theme) }}>
    {children}
    <Arrow arrowColor={theme.palette.textColor} arrowSize={arrowSize} />
  </div>
)

const FastHover = ({ children, arrowSize = 10,  style }, { theme }) => (
  <div style={{ ...CONTAINER_STYLE, marginLeft: arrowSize, ...style, ...getThemeStyling(theme) }}>
    {children}
    <Arrow arrowColor={theme.palette.textColor} arrowSize={arrowSize} />
  </div>
)

FastHover.propTypes = {
  children: PropTypes.node,
  background: PropTypes.string,
  style: PropTypes.object,
  arrowSize: PropTypes.number
}

FastHover.contextTypes = {
  theme: PropTypes.object.isRequired
}

SvgHover.contextTypes = {
  theme: PropTypes.object.isRequired
}

export default FastHover

export {
  FastHover,
  SvgHover
}