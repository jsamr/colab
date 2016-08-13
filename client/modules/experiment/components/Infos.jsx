import React, { PropTypes } from 'react'

const Infos = ({ style }, { muiTheme }) => (
  <div style={{ background: muiTheme.application.background }}>

  </div>
)

Infos.propTypes = {
  style: PropTypes.object
}

Infos.contextTypes = {
  muiTheme: PropTypes.object.isRequired
}

export default Infos

