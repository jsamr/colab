import React, { Component, PropTypes } from 'react'
import { Card, CardTitle, CardActions, CardText, CardHeader  } from 'material-ui/Card'
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import ExperimentSearch from './ExperimentSearch'
import { Tabs, Tab } from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import SearchIcon from 'material-ui/svg-icons/action/search'
import SimpleLoading from '/imports/ui/SimpleLoading.jsx'

class Project extends Component {
  render () {
    let { project, style, headerBackground, selectedProject } = this.props
    let inner
    console.info('PROJECT SELECTED : ', selectedProject && selectedProject === project, project, selectedProject)
    if (selectedProject && selectedProject === project) {
      inner = (
        <Card style={style || {}}
              expanded={true}
              initiallyExpanded={true}
              containerStyle={{ flexGrow: 1 }}>
          <CardTitle style={{ display: 'flex', alignItems: 'center', background: headerBackground }}
                     title={project.fullName}>
            <Toolbar
              style={{ display: 'flex', justifyContent: 'space-around', flexGrow: 1, marginLeft: 20, background: 'black' }}>
              <ToolbarGroup style={{ alignItems: 'center', display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
                <SearchIcon style={{ width: 35, height: 35 }}/>
                <TextField style={{ fontSize: 30, flexBasis: 500 }} autoFocus={true} id={project._id}/>
              </ToolbarGroup>
              <ToolbarSeparator />
              <ToolbarGroup>
                <IconButton>
                  <FontIcon>?</FontIcon>
                </IconButton>
              </ToolbarGroup>

            </Toolbar>
          </CardTitle>
          <CardText style={{ flexGrow: 1 }}>
            <ExperimentSearch project={project}/>
          </CardText>
        </Card>
      )
    } else inner = <SimpleLoading />
    return inner
  }
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
  selectedProject: PropTypes.object
}

const ProjectsList = ({ projects, selectedProject, selectProject, headerBackground, style, cardStyle = null }, { t, theme }) => {
  const projeez = projects.map((prj, index) => (
    <Tab key={prj._id} label={prj.acronym} value={prj} >
      <Project style={cardStyle} project={prj} headerBackground={headerBackground} selectedProject={selectedProject} />
    </Tab>
  ))
  const tabs = (
    <Tabs
      tabItemContainerStyle={{ background: theme.palette.headerColor }}
      contentContainerStyle={{ display: 'flex', flexFlow: 'column nowrap' }}
      onChange={(prj) => selectProject(prj)}
      style={style} value={selectedProject}>
      { projeez }
    </Tabs>
  )
  const projectsList = projeez.length ? tabs : <div>{t('dashboard.noprojects')}</div>
  return projectsList
}

ProjectsList.contextTypes = {
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
}

ProjectsList.propTypes = {
  projects: PropTypes.array.isRequired,
  cardStyle: PropTypes.object,
  headerBackground: PropTypes.string,
  selectedProject: PropTypes.object,
  selectProject: PropTypes.func.isRequired
}

export default ProjectsList
