import React from 'react'
import i18n from 'meteor/universe:i18n'

export default ({ style }) => (
  <div className='loader' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow: 'column wrap', fontSize: 50, flexGrow: 1, ...style }}>
    <i style={{ margin: 0 }} className='mdi fa mdi-spin-constant fa-spinner' />
  </div>
)
