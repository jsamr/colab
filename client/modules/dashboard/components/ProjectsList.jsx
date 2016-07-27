import React, { Component, PropTypes } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import ProjectCard from '../containers/ProjectCard'

import SimpleLoading from '/imports/ui/SimpleLoading.jsx'
import Project from '/imports/api/Project'

class TabTemplate extends React.Component {
  render () {
    if (!this.props.selected) {
      return null
    }
    return this.props.children
  }
}

const ProjectsList = ({ projects, selectedProjectId, selectProject, headerBackground, style, cardStyle = null, loading }, { t, theme }) => {
  if (!loading) {
    const projeez = projects.map((prj, index) => (
      <Tab key={prj._id} label={prj.acronym} value={prj._id} style={{ flexGrow: 1, alignItems: 'stretch', flexFlow: 'column nowrap' }}>
        <ProjectCard style={cardStyle} project={prj}
                     headerBackground={headerBackground}
                     selectedProjectId={selectedProjectId} />
      </Tab>
    ))
    const tabs = (
      <Tabs
        tabItemContainerStyle={{ background: theme.palette.headerColor }}
        contentContainerStyle={{ display: 'flex', flexFlow: 'column nowrap', flexGrow: 1 }}
        tabTemplate={TabTemplate}
        // typecheck because of this issue : https://github.com/callemall/material-ui/issues/2189
        onChange={(prj) => { if (typeof prj === 'string') selectProject(prj) }}
        style={style} value={selectedProjectId}>
        { projeez }
      </Tabs>
    )
    const projectsList = projeez.length ? tabs : <div>{t('dashboard.noprojects')}</div>
    return projectsList
  } else return <SimpleLoading />
}

ProjectsList.contextTypes = {
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
}

ProjectsList.propTypes = {
  projects: PropTypes.array,
  cardStyle: PropTypes.object,
  headerBackground: PropTypes.string,
  selectedProjectId: PropTypes.string,
  selectProject: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

export default ProjectsList
