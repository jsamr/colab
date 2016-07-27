import React, { Component, PropTypes } from 'react'
import { Card, CardTitle, CardActions, CardText, CardHeader  } from 'material-ui/Card'
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar'
import TextField from 'material-ui/TextField'
import SearchIcon from 'material-ui/svg-icons/action/search'
import ExperimentsList from '../containers/ExperimentsList'
import SimpleLoading from '/imports/ui/SimpleLoading'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'

class ProjectCard extends Component {
  render () {
    let { project, style, headerBackground, selectedProjectId, selectFilter, filter } = this.props
    let { theme } = this.context
    let inner
    if (selectedProjectId && selectedProjectId === project._id) {
      inner = (
        <Card style={style || {}}
              expanded={true}
              initiallyExpanded={true}
              containerStyle={{ flexGrow: 1 }}>
          <CardTitle style={{ display: 'flex', alignItems: 'center', background: headerBackground }}
                     titleStyle={{ flexBasis: 400 }}
                     title={project.fullName}>
            <Toolbar
              style={{ display: 'flex', justifyContent: 'space-around', flexGrow: 1, marginLeft: 20, height: 'auto', background: theme.palette.canvasColor }}>
              <ToolbarGroup style={{ alignItems: 'center', display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
                <SearchIcon style={{ width: 65, height: 65 }}/>
                <TextField onChange={(e) => selectFilter(e.target.value)}
                           style={{ fontSize: 30, flexBasis: 500 }}
                           autoFocus={true}
                           id={project._id}
                           defaultValue={filter}
                />
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
            <ExperimentsList project={project} filter={filter} />
          </CardText>
        </Card>
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
  filter: PropTypes.string
}

export default ProjectCard