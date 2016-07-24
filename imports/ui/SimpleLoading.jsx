import React from 'react'
import i18n from 'meteor/universe:i18n'

export default (props) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow: 'column wrap', fontSize: 50, flexGrow: 1 }}>
    <i style={{ margin: 0 }} className='mdi mdi-spin mdi-google-circles-communities' />
    <em style={{ fontSize: 30 }}>{i18n.__('loading')}</em>
  </div>
)
