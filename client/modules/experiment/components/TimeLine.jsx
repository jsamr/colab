import React, { PropTypes } from 'react'
import LoadableComponent from './LoadableComponent'
import TimeReferential from '../containers/TimeReferential'

const Container = ({children, style}) => <div style={style}>{children}</div>

const TimeLine = ({ expLoading, loading, project, annotations, tasks, experiment, style, visible }, { muiTheme }) => {
  const referential = visible ? <TimeReferential
                                                 project={project}
                                                 annotations={annotations}
                                                 tasks={tasks}
                                                 experiment={experiment} /> : null
  const getInner = () => {
    const spacing = visible ? muiTheme.experiment.padding : 0
    return (
      <div style={{
        display: 'flex',
        alignItems: 'stretch',
        width: '100%',
        paddingLeft: spacing,
        paddingRight: spacing,
        marginBottom: spacing,
        background: muiTheme.experiment.timeLineBackground
      }}>
        {referential}
      </div>
    )
  }
  return (
    <LoadableComponent
    loading={expLoading || loading}
    getInner={getInner}
    Container={Container}
    style={{ height: '100%', width: '100%', display: 'flex', ...style }} />
  )
}

TimeLine.propTypes = {
  loading: PropTypes.bool.isRequired,
  expLoading: PropTypes.bool.isRequired,
  experiment: PropTypes.object,
  project: PropTypes.object,
  annotations: PropTypes.array,
  tasks: PropTypes.array,
  visible: PropTypes.bool.isRequired,
  style: PropTypes.object
}

TimeLine.contextTypes = {
  muiTheme: PropTypes.object.isRequired
}

export default TimeLine
