import React from 'react'
import Account from '../containers/Account'
import Projects from './Projects'

const DASHBOARD_SECTION_ICON_SIZE = 60

const DashBoard = () => {
  const root = (
    <div style={{ display: 'flex', flexFlow: 'row wrap', flexGrow: 1, minHeight: '100%', alignSelf: 'stretch' }}>
      <Projects iconSize={DASHBOARD_SECTION_ICON_SIZE} />
      <Account iconSize={DASHBOARD_SECTION_ICON_SIZE} />
    </div>
  )
  return root
}

export default DashBoard
