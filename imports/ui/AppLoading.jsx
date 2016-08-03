import React from 'react'
import i18n from 'meteor/universe:i18n'
import CircularProgress from 'material-ui/CircularProgress';
import DefaultPageRoot from './DefaultPageRoot'

export default (props) => (
  <DefaultPageRoot style={{ height: '100vh' }}>
    <span style={{ fontFamily: 'monospace', fontSize: '20vw' }}>CoLab</span>
    <div style={{ flexGrow: 1, display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress style={{ flexGrow: 1 }} size={2}/>
      <em style={{ fontSize: 15, flexGrow: 1 }}>{i18n.__('loading')}</em>
    </div>
  </DefaultPageRoot>
)
