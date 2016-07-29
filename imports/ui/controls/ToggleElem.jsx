import React, { PropTypes } from 'react'

const ToggleElem = ({ visible, elemClass }, { theme }) => {
  const clazz = visible? 'fa-eye-slash' : 'fa-eye'
  return (
    <span style={{ position: 'relative', fontSize: 24, height: 'inherit', width: 'inherit' }}>
      <i className={`fa ${elemClass}`} style={{ fontSize: '1em', position: 'relative', color: theme.palette.textColor }}/>
      <i className={`fa ${clazz}`}
         style={{
           position: 'absolute',
           background: 'inherit',
           color: theme.palette.accent3Color,
           borderRadius: 10,
           fontSize: '0.8em',
           bottom: '-0.45em',
           left: '0.2em'
         }}/>
    </span>
  )
}

ToggleElem.propTypes = {
  visible: PropTypes.bool.isRequired,
  elemClass: PropTypes.string.isRequired
}

ToggleElem.contextTypes = {
  theme: PropTypes.object.isRequired
}

export default ToggleElem