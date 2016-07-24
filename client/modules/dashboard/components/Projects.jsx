import Paper from 'material-ui/Paper'
import React, { PropTypes } from 'react'
import ProjectIcon from '/imports/icons/ProjectIcon'
import JoinIcon from 'material-ui/svg-icons/action/launch'
import RaisedButton from 'material-ui/RaisedButton'
import HeadBar from './HeadBar.jsx'
import ProjectsList from '../containers/ProjectsList'

const columnFlexStyle = {
  display: 'flex',
  flexFlow: 'column nowrap'
}

const Projects = ({ iconSize }, { t, theme }) => {
  const joinIcon = <JoinIcon/>
  return (
    <Paper rounded={false} zDepth={3} style={{ flexGrow: 4, flexBasis: 1200, background: theme.palette.accent2Color, padding: 10, ...columnFlexStyle }}>
      <HeadBar actions={<RaisedButton label={t('actions.joinproject')} secondary={true} icon={joinIcon} />}>
        <ProjectIcon style={{ padding: `0 ${iconSize}px`, width: iconSize, height: iconSize }}/>
        {t('dashboard.myprojects')}
      </HeadBar>
      <ProjectsList cardStyle={{ background: theme.palette.accent3Color, flexGrow: 1, borderRadius: 0, ...columnFlexStyle }}
                    headerBackground={ theme.palette.primary1Color }
                    style={{ marginTop: 10, flexGrow: 1, ...columnFlexStyle }}
                    iconSize={iconSize} />
    </Paper>
  )
}

Projects.contextTypes = {
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
}

export default Projects
