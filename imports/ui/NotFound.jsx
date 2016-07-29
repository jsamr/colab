import React, { PropTypes } from 'react'
import DefaultPageRoot from './DefaultPageRoot'
import Warning from 'material-ui/svg-icons/alert/warning'

const NotFound = ({message}, {theme}) => (
  <DefaultPageRoot>
    <div>
      <h1 style={{ textAlign: 'center' }}><Warning style={{ width: 100, height: 100, color: theme.palette.warningColor }} /></h1>
      <h1>{message}</h1>
    </div>
  </DefaultPageRoot>
)

NotFound.propTypes = {
  message: PropTypes.node.isRequired
}

NotFound.contextTypes = {
  theme: PropTypes.object.isRequired
}

export default NotFound
