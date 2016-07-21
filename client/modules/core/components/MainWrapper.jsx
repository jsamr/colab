import React from 'react'

export default (props) => (
  <div style={{ position: 'relative', top: 80, width: '100%', height: props.height }} {...props} >
    { props.children }
  </div>
)
