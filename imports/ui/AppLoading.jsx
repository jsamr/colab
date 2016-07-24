import React from 'react'
import i18n from 'meteor/universe:i18n'

export default (props) => (
  <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 300, flexFlow: 'column wrap' }}>
    <span style={{ fontFamily: 'monospace' }}>CoLab</span>
    <i style={{ margin: 0 }} className='mdi mdi-spin mdi-google-circles-communities' />
    <em style={{ fontSize: 30 }}>{i18n.__('loading')}</em>
  </div>
)
