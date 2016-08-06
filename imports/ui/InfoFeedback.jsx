import React, { PropTypes } from 'react'
import BigFeedback from './BigFeedback'
import Info from 'material-ui/svg-icons/action/info'

const InfoFeedback = ({...props}, { theme }) => (
  <BigFeedback Icon={Info} color={theme.palette.infoColor} {...props} />
)

InfoFeedback.propTypes = {
  message: PropTypes.node.isRequired
}

InfoFeedback.contextTypes = {
  theme: PropTypes.object.isRequired
}

export default InfoFeedback
