import React, { PropTypes } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import Sources from '../containers/Sources'

const ExperimentMenu = ({ experiment }, { t }) => (
  <Tabs key='body' style={{ flexGrow: 1, width: '100%', height: 1}} >
    <Tab icon={<FontIcon className='fa fa-info'/>} label={t('exp.infos')}>
      INFO TAB
    </Tab>
    <Tab icon={<FontIcon className='fa fa-video-camera'/>} label={t('exp.sources')}>
      <Sources experiment={experiment} />
    </Tab>
    <Tab icon={<FontIcon className='fa fa-tasks'/>} label={t('exp.tasks')}>
      TASKS TAB
    </Tab>
    <Tab icon={<FontIcon className='fa fa-users'/>} label={t('exp.collaboration')}>
      USERS TAB
    </Tab>
  </Tabs>
)

ExperimentMenu.propTypes = {
  experiment: PropTypes.object.isRequired
}

ExperimentMenu.contextTypes = {
  t: PropTypes.func.isRequired
}

export default ExperimentMenu