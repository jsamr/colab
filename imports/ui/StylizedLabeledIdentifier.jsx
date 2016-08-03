import React, { PropTypes } from 'react'
import { fInlineAround } from '/imports/styles'

const identifierStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  flexFlow: 'column nowrap',
  height: '100%'
}

const StylizedLabeledIdentifier = ({ preferredWidth = 90, labelSize = 12, label, identifier, idFontSize, stripColor = 'black', style }) => (
  <div style={{ ...identifierStyle, flexBasis: preferredWidth, textTransform: 'none', ...style }}>
    <div style={{ fontSize: labelSize, ...fInlineAround }}>
      <span>{label}</span>
    </div>
    <div style={{ fontSize: idFontSize, ...fInlineAround }}>
      <span style={{ flexGrow: 1, background: stripColor, height: labelSize, marginRight: labelSize }}> </span>
      <span>{identifier}</span>
      <span style={{ flexGrow: 1, background: stripColor, height: labelSize, marginLeft: labelSize }}> </span>
    </div>
  </div>
)

StylizedLabeledIdentifier.propTypes = {
  label: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
  preferredWidth: PropTypes.number,
  labelSize: PropTypes.number
}

export default StylizedLabeledIdentifier
