import React, { PropTypes } from 'react'
import FontIcon from 'material-ui/FontIcon'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import HeadBar from './HeadBar.jsx'
import JoinIcon from 'material-ui/svg-icons/action/launch'
import { Card, CardTitle, CardText, CardHeader } from 'material-ui/Card'
import { fColumnNoWrap } from '/imports/styles'

const Account = ({ user }, { t, theme }) => {
  if (user) {
    const joinIcon = <JoinIcon/>
    const actions = [
      <RaisedButton key='join' label={t('actions.joinproject')} secondary={true} icon={joinIcon} />,
      <RaisedButton key='edit' label={t('actions.editprofile')} primary={true} icon={<FontIcon className='mdi mdi-pencil-box' />} />
    ]
    const name = `${user.profile.firstname} ${user.profile.lastname}`
    const userIcon = <FontIcon className='mdi mdi-account' style={{ padding: `0 ${0}px`, fontSize: 40 }}/>
    return (

      <Paper rounded={false} zDepth={5} style={{
        padding: 10,
        flexGrow: 1,
        flexBasis: 400,
        alignSelf: 'stretch',
        background: theme.palette.accent2Color,
        ...fColumnNoWrap,
        justifyContent: 'flex-start'
      }}>
        <HeadBar actions={actions} />
        <Card rounded={false} style={{ marginTop: 10, background: 'transparent' }}>
          <CardHeader avatar={userIcon} title={name} subtitle={`@${user.username}`} subtitleStyle={{ fontFamily: 'monospace', fontWeight: 'bold' }} />
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