import React, { Component, PropTypes } from 'react'
import { Card, CardTitle, CardActions, CardText, CardHeader  } from 'material-ui/Card'
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar'
import TextField from 'material-ui/TextField'
import SearchIcon from 'material-ui/svg-icons/action/search'
import ExperimentsList from '../containers/ExperimentsList'
import SimpleLoading from '/imports/ui/SimpleLoading'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import { fInlineAround, fInlineCenter } from '/imports/styles'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import ProjectIcon from '/imports/ui/icons/ProjectIcon'

class ProjectCard extends Component {
  render () {
    let { project, style, headerBackground, cardBackground, selectedProjectId, selectFilter, filter } = this.props
    let { theme } = this.context
    let inner
    if (selectedProjectId && selectedProjectId === project._id) {
      inner = (
        <div>
          <Card style={style || {}}
                expanded={true}
                initiallyExpanded={true}
                containerStyle={{ flexGrow: 1 }}>
            <CardTitle style={{ background: 'transparent', justifyContent: 'center', ...fInlineCenter }}>
              <Toolbar
                style={{ flexGrow: 1, height: 'auto', background: 'transparent', maxWidth: 800, ...fInlineAround }}>
                <ToolbarGroup style={{ alignItems: 'center', display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
                  <SearchIcon style={{ width: 65, height: 65, color: theme.palette.canvasColor }}/>
                  <TextField onChange={(e) => selectFilter(e.target.value)}
                             style={{ fontSize: 30, flexBasis: 500, color: theme.palette.canvasColor }}
                             autoFocus={true}
                             id={project._id}
                             defaultValue={filter}
                  />
                </ToolbarGroup>
                <ToolbarGroup>
                  <IconButton>
                    <SettingsIcon color={theme.palette.canvasColor} />
                  </IconButton>
                </ToolbarGroup>
              </Toolbar>
            </CardTitle>
            <CardText style={{ flexGrow: 1 }}>
              <ExperimentsList cardBackground={cardBackground} project={project} filter={filter} />
            </CardText>
          </Card>
        </div>
      )
    } else inner = <SimpleLoading />
    return inner
  }
}
ProjectCard.contextTypes = {
  theme: PropTypes.object.isRequired
}

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  selectedProjectId: PropTypes.string,
  selectFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
  headerBackground: PropTypes.string.isRequired,
  cardBackground: PropTypes.string.isRequired
}

export default ProjectCard