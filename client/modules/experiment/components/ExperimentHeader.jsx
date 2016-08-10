import React, { PropTypes } from 'react'
import ExperimentState from './ExperimentState'
import LoadableComponent from './LoadableComponent'
import Toolbar, { ToolbarGroup, ToolbarSeparator } from 'material-ui/'
import StylizedLabeledIdentifier from '/imports/ui/StylizedLabeledIdentifier'

const Separator = ({ children }) => <ToolbarSeparator style={{ top: 0, height: '70%', margin: '15% 0' }} children={children} />

const ExperimentHeader = ({ params, experiment, loading }, { t, theme }) => {
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
          <ToolbarGroup key='experimentState' style={{ fontSize: 15, flexGrow: 0, flexBasis: 270 }}>
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
      justifyContent: 'center',
      height: 48,
      borderRadius: 3,
      background: 'transparent'
     }}
  />
}

ExperimentHeader.propTypes = {
  loading: PropTypes.bool.isRequired,
  experiment: PropTypes.object,
  project: PropTypes.object
}

ExperimentHeader.contextTypes = {
  theme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
}

export default ExperimentHeader
