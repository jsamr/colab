import React, { PropTypes } from 'react'
import DefaultPageRoot from './DefaultPageRoot'

const BigFeedback = ({message, children, style, Icon, color}) => (
  <DefaultPageRoot style={style}>
    <div>
      <h1 style={{ textAlign: 'center' }}><Icon style={{ width: 100, height: 100, color }} /></h1>
      <h1 style={{ textAlign: 'center' }}>{message}</h1>
      <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center' }}>
        {children}
      </div>
    </div>
  </DefaultPageRoot>
)

BigFeedback.propTypes = {
  message: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired
}

export default BigFeedback
