import React, { PropTypes } from 'react'
import Tooltipable from '/imports/ui/Tooltipable'
import IconStackWhite from '../icons/IconStackWhite'

const PrevalidatedClinic = ({ prevalidatedClinic = false }, { theme }) => {
  const localizedTextId = prevalidatedClinic ? 'experiment.clinicvalid' : 'experiment.clinicinvalid'
  const icon2 = prevalidatedClinic ? 'fa-check-circle' : 'fa-times-circle'
  const color = prevalidatedClinic ? theme.palette.successColor : theme.palette.failureColor
  return (
    <Tooltipable localizedTextId={localizedTextId}>
      <IconStackWhite style={{ color }} icon1='fa-user-md' icon2={icon2} />
    </Tooltipable>
  )
}

PrevalidatedClinic.propTypes = {
  prevalidatedClinic: PropTypes.bool
}

PrevalidatedClinic.contextTypes = {
  theme: PropTypes.object.isRequired
}

export default PrevalidatedClinic