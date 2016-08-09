import React, { PropTypes } from 'react'
import FontIcon from 'material-ui/FontIcon'

const CaptionFeedback = ({ isPresent }, { theme }) => (
  <FontIcon
    color={ isPresent ? theme.palette.successColor : theme.palette.failureColor }
    className={`mdi mdi-video${isPresent ? '' : '-off'}`}/>
)

CaptionFeedback.propTypes = {
  isPresent: PropTypes.bool.isRequired
}

CaptionFeedback.contextTypes = {
  theme: PropTypes.object.isRequired
}

export default CaptionFeedback
