import React, { PropTypes } from 'react'
import SimpleLoading from '/imports/ui/SimpleLoading'
import Paper from 'material-ui/Paper'

const DefaultContainer = ({ children, style, ...props }) => <Paper style={{ animation: 'fadein 1s', ...(style || {}) }} rounded={false} { ...props }>{children}</Paper>

const LoadableComponent = ({ loading, getInner, Container = DefaultContainer, style }) => {
  if (loading) return <div style={style} ><SimpleLoading style={{ fontSize: 25 }}/></div>
  else return <Container style={style}>{getInner()}</Container>
}

LoadableComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  getInner: PropTypes.func.isRequired,
  Container: PropTypes.func
}

export default LoadableComponent