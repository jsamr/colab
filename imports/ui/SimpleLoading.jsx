import React from 'react'
import i18n from 'meteor/universe:i18n'
import { fColumnNoWrap } from '/imports/styles'

const SimpleLoading = ({ style }, { theme }) => (
  <div className='loader'
       style={{ ...fColumnNoWrap, color: theme.palette.alternateTextColor, justifyContent: 'center', alignItems: 'center', fontSize: 50, flexGrow: 1, zIndex: 10, ...style }}>
    <i style={{ margin: 0 }} className='mdi fa mdi-spin-constant fa-spinner' />
  </div>
)

SimpleLoading.contextTypes = {
  theme: React.PropTypes.object.isRequired
}

export default SimpleLoading
