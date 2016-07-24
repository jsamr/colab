import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import ExpPublished from '/imports/ui/indicators/ExpPublished'
import PrevalidatedTech from '/imports/ui/indicators/PrevalidatedTech'
import PrevalidatedClinic from '/imports/ui/indicators/PrevalidatedClinic'
import Synchronized from '/imports/ui/indicators/Synchronized'

const AlignedSpan = ({ children }) => <span style={{ display: 'flex', alignItems: 'center' }}>{children}</span>

const flexInline = { display: 'flex', justifyContent: 'space-around', alignItems: 'center' }

const expStyle = {
  flexBasis: 250,
  height: 150,
  margin: 10,
  display: 'flex',
  flexFlow: 'column wrap',
  alignItems: 'space-between'
}

const ExperimentsList = ({ experiments }, { theme, t }) => {
  let experimentsItems = experiments.map((exp) => {
    return (
      <Paper key={exp._id} circle={false} zDepth={2} style={{ background: theme.palette.accent1Color, ...expStyle }}>
        <h2 style={{ textAlign: 'center', fontSize: 28, background: theme.palette.accent4Color, opacity: 0.5, paddingTop: 10, marginTop: 0 }}>{exp.name}</h2>
        <div style={flexInline}>
          <AlignedSpan><i className='mdi mdi-calendar' />&nbsp;{exp.date}</AlignedSpan>
          <AlignedSpan><i className='fa fa-hourglass' />&nbsp;{exp.getReadableDuration()}</AlignedSpan>
        </div>
        <div style={{ flexGrow: 1, ...flexInline }}>
          <ExpPublished published={exp.published} />
          <PrevalidatedTech prevalidatedTech={exp.prevalidatedTech} />
          <PrevalidatedClinic prevalidatedClinic={exp.prevalidatedClinic} />
          <Synchronized synchronized={exp.synchronized} />
        </div>
      </Paper>
    )
  })
  if (experimentsItems.length === 0) experimentsItems = <div>{t('dashboard.noexps')}</div>
  return (
    <div style={{ display: 'flex', flexFlow: 'row wrap', margin: 'auto', justifyContent: 'center' }}>
      {experimentsItems}
    </div>
  )
}

ExperimentsList.propTypes = {
  experiments: PropTypes.array.isRequired
}

ExperimentsList.contextTypes = {
  theme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
}

export default ExperimentsList