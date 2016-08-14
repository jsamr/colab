import React from 'react'

const TaskSegment = ({ style, taskType, ...otherProps }) => (
  <rect
    rx='0'
    ry='0'
    onMouseEnter={() => console.info('Yeah I enterred mouse bro!')}
    onMouseLeave={() => console.info('Yeah I left mouse bro!')}
    style={style}
    {...otherProps}
  >
  </rect>
)

export default TaskSegment
