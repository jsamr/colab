import React, { PropTypes } from 'react'
import LoadableComponent from './LoadableComponent'
import TimeReferential from '../components/TimeReferential'

const TimeLine = ({ expLoading, loading, project, annotations, tasks, experiment }, { theme }) => {
  const getInner = () => (
    <div style={{ display: 'flex', alignItems: 'stretch', margin: 10, width: '100%' }}>
      <TimeReferential style={{ background: theme.palette.primary1Color }} project={project} annotations={annotations} tasks={tasks} experiment={experiment} />
    </div>
  )
  return (<LoadableComponent
    loading={expLoading || loading}
    getInner={getInner}
    style={{ background: theme.palette.accent2Color, height: '100%', display: 'flex' }} />)
}

TimeLine.propTypes = {
  loading: PropTypes.bool.isRequired,
  expLoading: PropTypes.bool.isRequired,
  experiment: PropTypes.object,
  project: PropTypes.object,
  annotations: PropTypes.array,
  tasks: PropTypes.array
}

TimeLine.contextTypes = {
  theme: PropTypes.object.isRequired
}

export default TimeLine