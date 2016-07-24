import React, { PropTypes } from 'react'

const ToggleElem = ({ visible, elemClass }) => {
  const clazz = visible? 'fa-eye-slash' : 'fa-eye'
  return (
    <span class="fa-stack ">
      <i className={`fa fa-stack-2x ${elemClass}`}/>
      <i className={`fa fa-stack-2x ${clazz}`}
         style={{ color: 'white', background: 'black', borderRadius: 10, fontSize: 21, bottom: -9, left: -12 }}/>
    </span>
  )
}

ToggleElem.propTypes = {
  visible: PropTypes.bool.isRequired,
  elemClass: PropTypes.string.isRequired
}

export default ToggleElem