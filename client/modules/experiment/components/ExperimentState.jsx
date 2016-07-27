import React, { PropTypes } from 'react'
import ExpPublished from '/imports/ui/indicators/ExpPublished'
import PrevalidatedTech from '/imports/ui/indicators/PrevalidatedTech'
import PrevalidatedClinic from '/imports/ui/indicators/PrevalidatedClinic'
import Synchronized from '/imports/ui/indicators/Synchronized'

const flexInline = { display: 'flex', justifyContent: 'space-around', alignItems: 'center' }

const ExperimentState = ({ experiment, style }) => (
  <div style={{ flexGrow: 1, ...flexInline, ...style }}>
    <ExpPublished published={experiment.published} />
    <PrevalidatedTech prevalidatedTech={experiment.prevalidatedTech} />
    <PrevalidatedClinic prevalidatedClinic={experiment.prevalidatedClinic} />
    <Synchronized synchronized={experiment.synchronized} />
  </div>
)

ExperimentState.propTypes = {
  experiment: PropTypes.object.isRequired
}

export default ExperimentState