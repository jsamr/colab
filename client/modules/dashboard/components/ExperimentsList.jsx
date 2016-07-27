import { Link } from 'react-router'
import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import SimpleLoading from '/imports/ui/SimpleLoading'
import FlatButton from 'material-ui/FlatButton'
import ExperimentState from '../../experiment/components/ExperimentState'

const AlignedSpan = ({ children }) => <span style={{ display: 'flex', alignItems: 'center' }}>{children}</span>

const flexInline = { display: 'flex', justifyContent: 'space-around', alignItems: 'center' }

const expStyle = {
  flexBasis: 250,
  width: 250,
  height: 150,
  margin: 10,
  display: 'flex',
  flexFlow: 'column wrap',
  alignItems: 'space-between'
}

const ExperimentsList = ({ experiments, loading, project }, { theme, t, nav }) => {
  if (!loading) {
    let experimentsItems = experiments.map((exp) => {
      return (
        <Paper onClick={()=> nav(`/e/${project.acronym}/${exp.name}`)}
               key={exp._id}
               zDepth={2}
               style={{ background: theme.palette.accent1Color, cursor: 'pointer', ...expStyle }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, background: theme.palette.accent4Color, opacity: 0.5, paddingTop: 10, marginTop: 0 }}>
            {exp.name}
          </h2>
          <div style={flexInline}>
            <AlignedSpan><i className='mdi mdi-calendar' />&nbsp;{exp.date}</AlignedSpan>
            <AlignedSpan><i className='fa fa-hourglass' />&nbsp;{exp.getReadableDuration()}</AlignedSpan>
          </div>
          <ExperimentState experiment={exp} />
        </Paper>
      )
    })
    if (experimentsItems.length === 0) experimentsItems = <div>{t('dashboard.noexps')}</div>
    return (
      <div style={{ display: 'flex', flexFlow: 'row wrap', margin: 'auto', justifyContent: 'center' }}>
        {experimentsItems}
      </div>
    )
  } else return <SimpleLoading />

}

ExperimentsList.propTypes = {
  experiments: PropTypes.array,
  filter: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  project: PropTypes.object.isRequired
}

ExperimentsList.contextTypes = {
  theme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  nav: PropTypes.func.isRequired
}

export default ExperimentsList