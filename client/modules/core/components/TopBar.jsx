import AppBar from 'material-ui/AppBar'
import React, { PropTypes, Component } from 'react'
import FontIcon from 'material-ui/FontIcon'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import { HeightSizer } from '/imports/ui/Sizer'

import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Status from '../../medianode/containers/Status'

const makeToolbar = (props, { t, nav, ROUTES }) => (
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

class TopBar extends Component {

  componentWillReceiveProps ({ size }) {
    const { onHeightUpdate } = this.props
    if (size.height !== this.props.size.height && onHeightUpdate) {
      onHeightUpdate(size.height)
    }
  }

  render () {
    const { preferredHeight, pageTitle, user } = this.props
    const context = this.context
    const title = (
      <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
        <div style={{ flexGrow: 1, flexShrink: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', maxHeight: preferredHeight, height: preferredHeight }}>
          {pageTitle}
        </div>
      </div>
    )
    const iconLeft = (
      <div style={{ maxHeight: preferredHeight }}>
        <img src='/colab-full.svg' style={{ height: preferredHeight }}/>
        <span style={{ fontSize: 12, fontFamily: 'monospace', marginTop: 'auto', height: 'auto', fontWeight: 'bold' }}>
        {`v ${context.VERSION}`}
    </span>
      </div>
    )
    return (
      <AppBar
        style={{ position: 'fixed', top: 0, minHeight: preferredHeight, paddingLeft: 0, paddingRight: 0, justifyContent: 'center', flexWrap: 'wrap' }}
        title={title}
        titleStyle={{ lineHeight: 'auto', flexGrow: 10, flexShrink: 1, minWidth: '-webkit-min-content', display: 'flex', justifyContent: 'center' }}
        iconStyleLeft={{ marginTop: 0, marginLeft: 0, marginRight: 0 }}
        iconStyleRight={{ margin: 0, justifyContent: 'center', flexGrow: 1 }}
        iconElementLeft={iconLeft}
        iconElementRight={user ? makeToolbar(this.props, context) : null}
      />
    )
  }
}

TopBar.contextTypes = {
  t: PropTypes.func.isRequired,
  VERSION: PropTypes.string.isRequired,
  ROUTES: PropTypes.object.isRequired,
  nav: PropTypes.func.isRequired
}

TopBar.propTypes = {
  onHeightUpdate: PropTypes.func,
  size: PropTypes.shape({
    height: PropTypes.number.isRequired
  }),
  preferredHeight: PropTypes.number.isRequired,
  user: PropTypes.object,
  pageTitle: PropTypes.node,
  logout: PropTypes.func.isRequired
}

export default HeightSizer(TopBar)
