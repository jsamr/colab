import React, { PropTypes } from 'react'
import RichAuthForm from './RichAuthForm'
import DefaultPageRoot from '/imports/ui/DefaultPageRoot'

const RegisterForm = (props, { ACCOUNT_STATES, t }) => {
  const header = props.header ? props.header : <h1>{t('auth.register')}</h1>
  return (
    <DefaultPageRoot>
      {header}
      <RichAuthForm formState={ACCOUNT_STATES.SIGN_UP} />
    </DefaultPageRoot>
  )
}

RegisterForm.contextTypes = {
  ACCOUNT_STATES: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
}

export default RegisterForm
