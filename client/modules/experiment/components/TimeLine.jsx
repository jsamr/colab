import React, { PropTypes } from 'react'
import LoadableComponent from './LoadableComponent'
import TimeReferential from '../containers/TimeReferential'

const TimeLine = ({ expLoading, loading, project, annotations, tasks, experiment, style, visible }, { theme }) => {
  const referential = visible ? <TimeReferential style={{ background: theme.palette.headerColor }}
                                                 project={project}
                                                 annotations={annotations}
                                                 tasks={tasks}
                                                 experiment={experiment} /> : null
  const getInner = () => (
    <div style={{ display: 'flex', alignItems: 'stretch', width: '100%', background: 'white', margin: visible ? 6 : 0 }}>
      {referential}
    </div>
  )
  return (
    <LoadableComponent
    loading={expLoading || loading}
    getInner={getInner}
    style={{ background: 'transparent', height: '100%', width: '100%', display: 'flex', ...style }} />
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
  theme: PropTypes.object.isRequired
}

export default TimeLine
