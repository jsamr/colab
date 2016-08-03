import React, { PropTypes } from 'react'
import Account from './Account'
import Projects from '../containers/Projects'

const DASHBOARD_SECTION_ICON_SIZE = 60

const DashBoard = (context, { user }) => (
    <div style={{ display: 'flex', flexFlow: 'row wrap-reverse', flexGrow: 1, minHeight: '100%', alignSelf: 'stretch' }}>
      <Projects iconSize={DASHBOARD_SECTION_ICON_SIZE} user={user} />
      <Account iconSize={DASHBOARD_SECTION_ICON_SIZE} user={user} />
    </div>
  )

DashBoard.contextTypes = {
  user: PropTypes.object.isRequired
}

export default DashBoard
