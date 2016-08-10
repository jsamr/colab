import React, { PropTypes } from 'react'

const IconStack = ({ big = false, dark = false, icon1, icon2, icon3 = null, style, ...otherProps }) => {
  const bigClass = big ? '' : 'fa-1x'
  const lightClass = dark ? 'fa-dark' : 'fa-light'
  const icon3Elem = icon3 ? <i className={`fa fa-bottom-left fa-padded ${icon3} fa-border-dark`} /> : null
  return (
    <a className={`fa-stack minibutton-icon ${bigClass}`} style={{ position: 'relative', fontSize: 12, ...style }} { ...otherProps }>
      <i className={`fa fa-stack-2x ${icon1}`} />
      {icon3Elem}
      <i className={`fa fa-bottom-right ${icon2} ${lightClass}`}/>
    </a>
  )
}

IconStack.propTypes = {
  tooltip: PropTypes.string,
  big: PropTypes.bool,
  dark: PropTypes.bool,
  icon1: PropTypes.string,
  icon2: PropTypes.string,
  icon3: PropTypes.string
}

export default IconStack
