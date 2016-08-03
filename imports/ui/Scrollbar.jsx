import React, { PropTypes } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

function renderThumb (thumbColor = 'transparent', visible = true) {
  const thumbStyle = {
    backgroundColor: thumbColor,
    cursor: 'pointer'
  }
  if (!visible) thumbStyle.display = 'none'
  return (
    ({ style, ...props }) => (
      <div
        style={{ ...style, ...thumbStyle }}
        {...props}>
      </div>
    )
  )
}

const Scrollbar = ({ children, style }, { theme }) => (
  <Scrollbars
    thumbMinSize={60}
    renderThumbVertical={renderThumb(theme.palette.textColor)}
    renderThumbHorizontal={renderThumb(null, false)}
    autoHide
    universal
    style={style}
  >{children}</Scrollbars>
)

Scrollbar.contextTypes = {
  theme: PropTypes.object.isRequired
}

export default Scrollbar
