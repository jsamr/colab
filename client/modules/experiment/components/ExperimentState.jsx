import React, { PropTypes } from 'react'
import ExpPublished from '/imports/ui/indicators/ExpPublished'
import PrevalidatedTech from '/imports/ui/indicators/PrevalidatedTech'
import PrevalidatedClinic from '/imports/ui/indicators/PrevalidatedClinic'
import Synchronized from '/imports/ui/indicators/Synchronized'
import { fInlineAround } from '/imports/styles'

const ExperimentState = ({ experiment, style }) => (
  <div style={{ flexGrow: 1, ...fInlineAround, ...style }}>
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