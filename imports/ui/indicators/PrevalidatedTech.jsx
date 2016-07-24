import React, { PropTypes } from 'react'
import Tooltipable from '/imports/ui/Tooltipable'
import IconStackWhite from '../icons/IconStackWhite'

const PrevalidatedTech = ({ prevalidatedTech = false }, { theme }) => {
  const localizedTextId = prevalidatedTech ? 'exp.techvalid' : 'exp.techinvalid'
  const icon2 = prevalidatedTech ? 'fa-check-circle' : 'fa-times-circle'
  const color = prevalidatedTech ? theme.palette.successColor : theme.palette.failureColor
  return (
    <Tooltipable localizedTextId={localizedTextId}>
      <IconStackWhite style={{ color }} icon1='fa-user' icon2={icon2} icon3='fa-cog' />
    </Tooltipable>
  )
}

PrevalidatedTech.propTypes = {
  prevalidatedTech: PropTypes.bool
}

PrevalidatedTech.contextTypes = {
  theme: PropTypes.object.isRequired
}

export default PrevalidatedTech