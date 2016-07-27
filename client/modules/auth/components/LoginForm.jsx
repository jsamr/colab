import React, { PropTypes } from 'react'
import RichAuthForm from './RichAuthForm'
import DefaultPageRoot from '/imports/ui/DefaultPageRoot'

const LoginForm = (props, { ACCOUNT_STATES, t }) => {
  const header = props.header ? props.header : <h1>{t('auth.must')}</h1>
  return (
    <DefaultPageRoot>
      {header}
      <RichAuthForm formState={ACCOUNT_STATES.SIGN_IN} />
    </DefaultPageRoot>
  )
}

LoginForm.contextTypes = {
  ACCOUNT_STATES: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
}

export default LoginForm
