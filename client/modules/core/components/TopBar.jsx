import AppBar from 'material-ui/AppBar'
import React, { PropTypes } from 'react'
import { ToolbarGroup } from 'material-ui/Toolbar'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Status from '../../medianode/containers/Status'

const makeToolbar = (props, { t, nav, ROUTES }) => (
  // TODO remove direct Meteor dep, use action through props instead
  <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'stretch', height: '100%' }}>
    <Status style={{ margin: 'auto' }}/>
    <Badge style={{ padding: 0, margin: 'auto', marginRight: 50 }} badgeStyle={{ position: 'absolute', right: -5, top: -5 }} badgeContent={4} primary={true}>
      <IconButton tooltip={t('topbar.notifications')}>
        <NotificationsIcon />
      </IconButton>
    </Badge>
    <IconButton tooltip={t('topbar.dashboard')} style={{ margin: 'auto' }} onClick={() => nav(ROUTES.HOME)}>
      <FontIcon className='mdi mdi-view-dashboard'/>
    </IconButton>
    <IconButton tooltip={t('topbar.exit')} style={{ margin: 'auto' }} onClick={props.logout}>
      <FontIcon className='mdi mdi-exit-to-app'/>
    </IconButton>
  </div>
)

const TopBar = (props, context) => {
  const title = (
    <div style={{ display: 'flex', height: '100%' }}>
      <span style={{ fontSize: 12, fontFamily: 'monospace', marginTop: 'auto', height: 'auto', fontWeight: 'bold' }}>
        {`v ${context.VERSION}`}
      </span>
      <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {props.pageTitle}
      </div>
    </div>
  )
  return (
    <AppBar
      style={{ position: 'fixed', top: 0, height: props.height }}
      title={title}
      titleStyle={{ lineHeight: 'auto' }}
      iconStyleLeft={{ marginTop: 0 }}
      iconStyleRight={{ marginTop: 0, marginBottom: 0 }}
      iconElementLeft={<img src='/colab-full.svg' style={{ height: props.height }}/>}
      iconElementRight={props.user ? makeToolbar(props, context) : null}
    />
  )
}

TopBar.contextTypes = {
  t: PropTypes.func.isRequired,
  VERSION: PropTypes.string.isRequired,
  ROUTES: PropTypes.object.isRequired,
  nav: PropTypes.func.isRequired
}

TopBar.propTypes = {
  user: PropTypes.object,
  pageTitle: PropTypes.node,
  logout: PropTypes.func.isRequired
}

export default TopBar
