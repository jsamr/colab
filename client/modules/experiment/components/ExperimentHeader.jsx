import React, { PropTypes } from 'react'
import ExperimentState from './ExperimentState'
import SimpleLoading from '/imports/ui/SimpleLoading'

const ExperimentHeader = ({ params, experiment, loading }) => {
  let { experimentName, projectAcronym } = params
  let stateElem = null
  if (loading) stateElem = (<SimpleLoading />)
  else if (experiment != null) stateElem = (<ExperimentState style={{ fontSize: 15, flexGrow: 0, flexBasis: 250 }} experiment={experiment} />)
  return (
    <div style={{ display: 'flex', marginLeft: 30, alignItems: 'baseline', justifyContent: 'flex-start', flexBasis: 400 }}>
      <span style={{ fontSize: 15, marginRight: 15 }}>{projectAcronym}</span>
      <span style={{ flexGrow: 1 }}>{experimentName}</span>
      {stateElem}
    </div>
  )
}

ExperimentHeader.propTypes = {
  loading: PropTypes.bool.isRequired,
  experiment: PropTypes.object,
  project: PropTypes.object
}

export default ExperimentHeader
