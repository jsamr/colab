import React, { PropTypes } from 'react'
import Tooltipable from '/imports/ui/Tooltipable'
import IconStackWhite from '../icons/IconStackWhite'

const ExpPublished = ({ published = false }, { theme }) => {
  const localizedTextId = published ? 'exp.published' : 'exp.unpublished'
  const icon2 = published ? 'fa-unlock' : 'fa-lock'
  const color = published ? theme.palette.infoColor : theme.palette.warningColor
  return (
    <Tooltipable localizedTextId={localizedTextId}>
      <IconStackWhite style={{ color }} icon1='fa-users' icon2={icon2} />
    </Tooltipable>
  )
}

ExpPublished.contextTypes = {
  theme: PropTypes.object.isRequired
}

ExpPublished.propTypes = {
  published: PropTypes.bool
}

export default ExpPublished
