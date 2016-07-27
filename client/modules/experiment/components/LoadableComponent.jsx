import React, { PropTypes } from 'react'
import DefaultPageRoot from '/imports/ui/DefaultPageRoot'
import SimpleLoading from '/imports/ui/SimpleLoading'
import Paper from 'material-ui/Paper'

const LoadableComponent = ({ loading, getInner, style  }) => {
  if (loading) return <div style={style}><SimpleLoading style={{ fontSize: 25 }}/></div>
  else return <Paper rounded={false} style={style}>{getInner()}</Paper>
}

LoadableComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  getInner: PropTypes.func.isRequired
}

export default LoadableComponent