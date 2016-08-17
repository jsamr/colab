import React, { PropTypes } from 'react'
import ExperimentState from './ExperimentState'
import LoadableComponent from '/imports/ui/LoadableComponent'
import Toolbar, { ToolbarGroup, ToolbarSeparator } from 'material-ui/'
import StylizedLabeledIdentifier from '/imports/ui/StylizedLabeledIdentifier'

const Separator = ({ children }) => <ToolbarSeparator style={{ top: 0, height: '70%', margin: '15% 0' }} children={children} />

const ExperimentHeader = ({ params, experiment, loading }, { t, muiTheme }) => {
  let { experimentName, projectAcronym } = params
  return <LoadableComponent
    loading={loading}
    getInner={() => {
      const children = [
        <StylizedLabeledIdentifier key='projectAcronym' label={t('experiment.project')} identifier={projectAcronym} stripColor='transparent'/>,
        <Separator key='sep1' />,
        <StylizedLabeledIdentifier key='experimentName' label={t('experiment.experiment')} identifier={experimentName} preferredWidth={150} stripColor='transparent' />
      ]
      if (experiment != null) {
        children.push(
          <Separator key='sep2'/>,
          <ToolbarGroup key='experimentState' style={{ fontSize: 15, flexGrow: 0, flexBasis: 270, alignSelf: 'flex-end', marginBottom: 5 }}>
            <ExperimentState experiment={experiment} style={{ width: 270 }} />
          </ToolbarGroup>
        )
      }
      return children
    }}
    container={Toolbar}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderRadius: 3,
      height: 64,
      background: muiTheme.experiment.background
     }}
  />
}

ExperimentHeader.propTypes = {
  loading: PropTypes.bool.isRequired,
  experiment: PropTypes.object,
  project: PropTypes.object
}

ExperimentHeader.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
}

export default ExperimentHeader
