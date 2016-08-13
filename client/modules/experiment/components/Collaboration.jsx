import React, { PropTypes } from 'react'

const Collaboration = ({ style }, { muiTheme }) => (
  <div style={{ background: muiTheme.application.background }}>

  </div>
)

Collaboration.propTypes = {
  style: PropTypes.object
}

Collaboration.contextTypes = {
  muiTheme: PropTypes.object.isRequired
}

export default Collaboration

