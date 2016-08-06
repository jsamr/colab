import React, { Component, PropTypes } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import ProjectCard from '../containers/ProjectCard'
import SimpleLoading from '/imports/ui/SimpleLoading.jsx'
import Project from '/imports/api/Project'
import { fInlineNoWrapCentered } from '/imports/styles'
import StylizedLabeledIdentifier from '/imports/ui/StylizedLabeledIdentifier'
import TabTemplate from '/imports/ui/TabTemplate'

const ProjectsList = ({ projects, selectedProjectId, selectProject, headerBackground, cardBackground, style, cardStyle = null, loading }, { t, theme }) => {
  if (!loading) {
    const projeez = projects.map((prj, index) => (
      <Tab key={prj._id}
           label={
           <div style={{ width: '100%', ...fInlineNoWrapCentered, justifyContent: 'center' }} >
            <StylizedLabeledIdentifier style={{ flexGrow: 1 }} label={t('experiment.project')} identifier={prj.acronym} idFontSize={40} stripColor={theme.palette.accent2Color} />
           </div>
           }
           value={prj._id}
           style={{ flexGrow: 1, alignItems: 'stretch', flexFlow: 'column nowrap' }}>
        <ProjectCard style={cardStyle} project={prj}
                     headerBackground={headerBackground}
                     cardBackground={cardBackground}
                     selectedProjectId={selectedProjectId} />
      </Tab>
    ))
    const tabs = (
      <Tabs
        tabItemContainerStyle={{ background: 'transparent' }}
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
  cardBackground: PropTypes.string,
  selectedProjectId: PropTypes.string,
  selectProject: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

export default ProjectsList
