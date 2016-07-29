import React, { PropTypes } from 'react'
import ToggleElem from './ToggleElem'

const ToggleAnnotation = ({ visible }) => <ToggleElem elemClass='fa-tags' visible={visible} />

ToggleAnnotation.propTypes = {
  visible: PropTypes.bool.isRequired
}

export default ToggleAnnotation