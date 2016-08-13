import React, { PropTypes } from 'react'

const Tasks = ({ style }, { muiTheme }) => (
  <div style={{ background: muiTheme.experiment.timeLineBackground, flexGrow: 1, ...style }}>
    TASKS YO!
  </div>
)

Tasks.contextTypes = {
  muiTheme: PropTypes.object.isRequired
}

export default Tasks
