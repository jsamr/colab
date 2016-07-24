import React, { PropTypes } from 'react'
import ExperimentsList from '../containers/ExperimentsList.jsx'

const ExperimentSearch = ({ project }) => (
  <div style={{ minHeight: 300, display: 'flex', flexFlow: 'column nowrap', alignItems: 'center' }}>
    <ExperimentsList project={project} />
  </div>
)

ExperimentSearch.propTypes = {
  project: PropTypes.object.isRequired
}

export default ExperimentSearch
