import React, { PropTypes } from 'react'
import FontIcon from 'material-ui/FontIcon'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import HeadBar from './HeadBar.jsx'
import { Card, CardTitle, CardText } from 'material-ui/Card'

const Account = ({ iconSize, user }, { t, theme }) => {
  if (user) {
    return (
      <Paper rounded={false} zDepth={5} style={{
        padding: 10,
        flexGrow: 1,
        display: 'flex',
        flexFlow: 'column wrap',
        flexBasis: 400,
        alignSelf: 'stretch',
        background: theme.palette.accent2Color
      }}>
        <HeadBar actions={<RaisedButton label={t('actions.editprofile')} primary={true} icon={<FontIcon className='mdi mdi-pencil-box' />} />}>
          <FontIcon className='mdi mdi-account' style={{ padding: `0 ${iconSize}px`, fontSize: iconSize }}/>
        </HeadBar>
        <Card rounded={false} style={{ marginTop: 10 }}>
          <CardTitle title={`${user.profile.firstname} ${user.profile.lastname}`} subtitle={`@${user.username}`} subtitleStyle={{ fontFamily: 'monospace', fontWeight: 'bold' }} />
          <CardText>
            {<h3>{user.getFirstAddress()}</h3>}
          </CardText>
        </Card>
      </Paper>)
  } else return null
}

Account.contextTypes = {
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
}

Account.propTypes = {
  user: PropTypes.object
}

export default Account