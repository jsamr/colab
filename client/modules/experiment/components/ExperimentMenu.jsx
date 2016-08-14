import React, { PropTypes } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import FontIcon from 'material-ui/FontIcon'
import Sources from '../containers/Sources'
import Tasks from './Tasks'
import Infos from './Infos'
import Collaboration from './Collaboration'
import TabTemplate from '/imports/ui/TabTemplate'

const ExperimentMenu = ({ selectedMenuTab, selectMenuTab, experiment }, { t, muiTheme, theme }) => {
  const tabsDefinition = [
    { value: 'infos', icon: 'fa fa-info', Content: Infos },
    { value: 'sources', icon: 'mdi mdi-video', Content: Sources },
    { value: 'tasks', icon: 'fa fa-tasks', Content: Tasks },
    { value: 'collaboration', icon: 'fa fa-users', Content: Collaboration }
  ]
  return (
    <Tabs key='body'
          style={{ flexGrow: 1, width: '100%', display: 'flex', flexFlow: 'column nowrap' }}
          contentContainerStyle={{ flexGrow: 1, display: 'flex', flexFlow: 'column nowrap' }}
          tabItemContainerStyle={{ background: muiTheme.experiment.background, borderTop: `solid ${theme.palette.textColor} ${muiTheme.experiment.padding}px` }}
          inkBarStyle={{ bottom: 2, height: 4 }}
          value={selectedMenuTab}
          tabTemplate={TabTemplate}
          onChange={(newValue) => {
            if (typeof newValue === 'string') {
              selectMenuTab(newValue)
            }
          }}>
      {tabsDefinition.map(({ value, icon, Content }) => (
        <Tab key={value} icon={<FontIcon className={icon}/>} value={value} >
          <Content experiment={experiment} style={{ padding: muiTheme.experiment.padding * 2 }}/>
        </Tab>
      ))}
    </Tabs>
  )
}

ExperimentMenu.propTypes = {
  selectedMenuTab: PropTypes.oneOf(['infos', 'sources', 'tasks', 'collaboration']).isRequired,
  selectMenuTab: PropTypes.func.isRequired,
  experiment: PropTypes.object.isRequired
}

ExperimentMenu.contextTypes = {
  t: PropTypes.func.isRequired,
  muiTheme: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default ExperimentMenu
