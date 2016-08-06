import React, { PropTypes } from 'react'
import BigFeedback from './BigFeedback'
import Warning from 'material-ui/svg-icons/alert/warning'

const NotFound = ({...props}, { theme }) => (
  <BigFeedback Icon={Warning} color={theme.palette.warningColor} {...props} />
)

NotFound.propTypes = {
  message: PropTypes.node.isRequired
}

NotFound.contextTypes = {
  theme: PropTypes.object.isRequired
}

export default NotFound

