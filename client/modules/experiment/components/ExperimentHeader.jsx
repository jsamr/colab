import React, { PropTypes } from 'react'
import ExperimentState from './ExperimentState'
import SimpleLoading from '/imports/ui/SimpleLoading'
import TimeIndicator from '../containers/TimeIndicator'
import LoadableComponent from './LoadableComponent'
import Toolbar, { ToolbarGroup, ToolbarSeparator } from 'material-ui/'
import { fInlineAround } from '/imports/styles'
const Separator = ({ children }) => <ToolbarSeparator style={{ top: 0, height: '70%', margin: '15% 0' }} children={children} />

const itemize = (text) => text.split('').map((char, index) => <span key={index}>{char}</span>)

const SpreadChars = ({text, style}) => <div style={{ ...fInlineAround, justifyContent: 'space-between', margin: '0 15px', ...style }}>{itemize(text)}</div>

const upperIdentifierStyle = {
  fontSize: 10
}

const identifierStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  flexFlow: 'column nowrap',
  height: '100%'
}

const ExperimentHeader = ({ params, experiment, loading }, { theme, t }) => {
  let { experimentName, projectAcronym } = params
  return <LoadableComponent
    loading={loading}
    getInner={() => {
      const children = [
        <div key='projectAcronym' style={{ ...identifierStyle, flexBasis: 90 }}>
          <SpreadChars text={t('exp.project')} style={upperIdentifierStyle} />
          <SpreadChars text={projectAcronym} />
        </div>,
        <Separator key='sep1' />,
        <div key='experimentName' style={{ ...identifierStyle, flexBasis: 160 }}>
          <SpreadChars text={t('exp.experiment')} style={upperIdentifierStyle} />
          <SpreadChars text={experimentName}/>
        </div>
      ]
      if (experiment != null) {
        children.push(
          <Separator key='sep2'/>,
          <ToolbarGroup key='experimentState' style={{ fontSize: 15, flexGrow: 0, flexBasis: 270 }}>
            <ExperimentState experiment={experiment} />
          </ToolbarGroup>,
          <Separator key='sep3'/>,
          <TimeIndicator key='experimentCursor' experiment={experiment} style={{ flexGrow: 1, textAlign: 'center' }} />
        )
      }
      return children
    }}
    container={Toolbar}
    style={{
      display: 'flex',
      marginLeft: 30,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexBasis: 800,
      flexGrow: 1,
      height: '100%'
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
