import React, { PropTypes } from 'react'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'

const Status = ({ style, valid, pending }, { t, theme }) => {
  let clazz
  let tooltip = null
  let color
  let iconStyle = {
    background: theme.palette.textColor,
    borderRadius: '50%'
  }
  if (pending) {
    color = theme.palette.warningColor
    clazz = 'mdi-spin mdi-video'
  } else if (valid) {
    clazz = 'mdi-video'
    tooltip = t('medianode.available')
    color = theme.palette.successColor
  } else {
    clazz = 'mdi-video-off'
    tooltip = t('medianode.unavailable')
    color = theme.palette.failureColor
  }
  return (
  <IconButton style={style} tooltip={tooltip} >
    <FontIcon style={iconStyle} color={color} className={`mdi ${clazz}`} />)
  </IconButton>
  )
}

Status.contextTypes = {
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
}

export default Status