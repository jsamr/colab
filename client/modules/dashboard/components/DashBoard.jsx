import React from 'react'
import { Card, CardTitle  } from 'material-ui/Card'
import Paper from 'material-ui/Paper'

function makeProjectCard (project) {
  return (
    <Card key={project._id}>
      <CardTitle title={project.acronym} subtitle={project.fullName} />
    </Card>
  )
}

const DashBoard = ({ projects }, { t, user }) => {
  const projeez = projects.map(makeProjectCard)
  const root = (
    <div style={{ display: 'flex', flexFlow : 'row', minHeight: '100%' }}>
      <Paper zDepth={3} style={{ height: '100%', padding: 20, margin: 10 }}>
        <h1>{t('dashboard.myprojects')}</h1>
        {projeez.length ? projeez : t('dashboard.noprojects')}
      </Paper>
      <Paper zDepth={3} style={{ height: '100%', padding: 20, margin: 10 }}>
        {<h1>{user && user.username}</h1>}
      </Paper>
    </div>
  )
  return root
}

DashBoard.contextTypes = {
  t: React.PropTypes.func.isRequired,
  user: React.PropTypes.object.isRequired
}

export default DashBoard
