import React, { PropTypes } from 'react'

const CONTAINER_STYLE = {
  background: 'white',
  color: 'black',
  position: 'absolute',
  left: '100%',
  top: 0,
  width: '65%',
  minWidth: 200,
  zIndex: 1000,
  padding: 10
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

const FastHover = ({ children, background = 'white', arrowSize = 10,  style }) => (
  <div style={{ ...CONTAINER_STYLE, marginLeft: arrowSize, ...style, background }}>
    {children}
    <Arrow arrowColor={background} arrowSize={arrowSize} />
  </div>
)

FastHover.propTypes = {
  children: PropTypes.node,
  background: PropTypes.string,
  style: PropTypes.object,
  arrowSize: PropTypes.number
}

export default FastHover
