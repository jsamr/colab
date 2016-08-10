import React, { PropTypes } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import FontIcon from 'material-ui/FontIcon'
import Sources from '../containers/Sources'
import TabTemplate from '/imports/ui/TabTemplate'

const ExperimentMenu = ({ selectedMenuTab, selectMenuTab, experiment }, { t }) => {
  const tabsDefinition = [
    { value: 'infos', icon: 'fa fa-info', content: <span>INFO TAB</span> },
    { value: 'sources', icon: 'mdi mdi-video', content: <Sources experiment={experiment} /> },
    { value: 'tasks', icon: 'fa fa-tasks', content: <span>INFO TASKS</span> },
    { value: 'collaboration', icon: 'fa fa-users', content: <span>INFO COLLAB</span> }
  ]
  return (
    <Tabs key='body'
          style={{ flexGrow: 1, width: '100%', display: 'flex', flexFlow: 'column nowrap', background: 'transparent' }}
          contentContainerStyle={{ flexGrow: 1, display: 'flex', flexFlow: 'column nowrap' }}
          value={selectedMenuTab}
          tabTemplate={TabTemplate}
          onChange={(newValue) => {
            if (typeof newValue === 'string') {
              selectMenuTab(newValue)
            }
          }}>
      {tabsDefinition.map(({ value, icon, content }) => (
        <Tab key={value} icon={<FontIcon className={icon}/>} label={t(`experiment.${value}`)} value={value} >
          {content}
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
  t: PropTypes.func.isRequired
}

export default ExperimentMenu
