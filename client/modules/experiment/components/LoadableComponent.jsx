import React, { PropTypes } from 'react'
import DefaultPageRoot from '/imports/ui/DefaultPageRoot'
import SimpleLoading from '/imports/ui/SimpleLoading'
import Paper from 'material-ui/Paper'

const DefaultContainer = ({ children, ... props }) => <Paper rounded={false} { ...props }>{children}</Paper>

const LoadableComponent = ({ loading, getInner, Container = DefaultContainer, style  }) => {
  if (loading) return <div style={style}><SimpleLoading style={{ fontSize: 25 }}/></div>
  else return <Container style={style}>{getInner()}</Container>
}

LoadableComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  getInner: PropTypes.func.isRequired,
  Container: PropTypes.func
}

export default LoadableComponent