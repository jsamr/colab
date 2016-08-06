import React, { PropTypes } from 'react'
import Tooltipable from '/imports/ui/Tooltipable'
import IconStackWhite from '../icons/IconStackWhite'

const Synchronized = ({ synchronized = false }, { theme }) => {
  const localizedTextId = synchronized ? 'experiment.synchronized' : 'experiment.notsynchronized'
  const icon2 = synchronized ? 'fa-check-circle' : 'fa-times-circle'
  const color = synchronized ? theme.palette.successColor : theme.palette.failureColor
  return (
    <Tooltipable localizedTextId={localizedTextId}>
      <IconStackWhite style={{ color }} icon1='fa-refresh' icon2={icon2}  />
    </Tooltipable>
  )
}

Synchronized.propTypes = {
  synchronized: PropTypes.bool
}

Synchronized.contextTypes = {
  theme: PropTypes.object
}

export default Synchronized