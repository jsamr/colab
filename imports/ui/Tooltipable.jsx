import React, { PropTypes } from 'react'
import Tooltip from 'rc-tooltip'
import i18n from 'meteor/universe:i18n'
import 'rc-tooltip/assets/bootstrap_white.css'

const Tooltipable = ({ localizedTextId, children, type = null, placement = 'top' }) => (
  <Tooltip overlay={i18n.__(localizedTextId)} placement={placement} >
    {children}
  </Tooltip>

)

Tooltipable.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
}

export default Tooltipable
