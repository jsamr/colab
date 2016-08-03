import React from 'react'
import Paper from 'material-ui/Paper'

export default ({ children, style }) => (
  <Paper style={{ flexGrow: 1, display: 'flex', flexFlow: 'column nowrap', alignItems: 'center', justifyContent: 'space-around', ...style }}>
    {children}
  </Paper>
)
