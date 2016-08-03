import Paper from 'material-ui/Paper'
import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import HeadBar from './HeadBar.jsx'
import ProjectsList from '../containers/ProjectsList'
import { fColumnNoWrap } from '/imports/styles'
import Scrollbar from '/imports/ui/Scrollbar'

const Projects = ({ iconSize, user, mainHeight }, { t, theme }) => {
  return (
    <Scrollbar
      style={{ flexGrow: 4, flexBasis: 1200, background: theme.palette.headerColor, ...fColumnNoWrap, height: mainHeight, overflowX: 'hidden' }}>
      <Paper rounded={false} zDepth={3} style={{ minHeight: '100%', background: 'transparent' }}>
        <ProjectsList cardStyle={{ background: 'transparent', flexGrow: 1, borderRadius: 0, ...fColumnNoWrap }}
                      headerBackground={ theme.palette.primary1Color }
                      cardBackground={ theme.palette.accent3Color }
                      style={{ ...fColumnNoWrap, minHeight: '100%' }}
                      iconSize={iconSize}
                      user={user}
                      maxHeight={mainHeight}/>
      </Paper>
    </Scrollbar>
  )
}

Projects.PropTypes = {
  user: PropTypes.object.isRequired,
  mainHeight: PropTypes.number.isRequired
}

Projects.contextTypes = {
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
}

export default Projects
