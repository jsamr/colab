import i18n from 'meteor/universe:i18n'
import { Accounts, STATES } from 'meteor/std:accounts-ui'
import React, { PropTypes } from 'react'
import { SimpleUser } from '/imports/api/User'

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

class RichLoginForm extends Accounts.ui.LoginForm {

  switchToSignUp (e) {
    e.preventDefault()
    this.context.nav(this.context.ROUTES.REGISTER)
  }

  switchToSignIn (e) {
    e.preventDefault()
    this.context.nav(this.context.ROUTES.LOGIN)
  }

  fields () {
    const { formState } = this.state
    const oldFields = super.fields()
    if (formState === STATES.SIGN_UP) {
      oldFields.username.hint = i18n.__('orders.provideyour') + i18n.__('validate.fields.username')
      oldFields.email.hint = i18n.__('orders.providea') + i18n.__('restrictions.validemail')
      oldFields.email.required = true
      oldFields.password.hint = i18n.__('orders.providea') + i18n.__('validate.fields.password')
      return {
        firstname: {
          id: 'firstname',
          hint: i18n.__('orders.provideyour') + i18n.__('validate.fields.firstname'),
          label: i18n.__('validate.fields.firstname'),
          required: true,
          onChange: this.handleChange.bind(this, 'firstname')
        },
        lastname: {
          id: 'lastname',
          hint: i18n.__('orders.provideyour') + i18n.__('validate.fields.lastname'),
          label: i18n.__('validate.fields.lastname'),
          required: true,
          onChange: this.handleChange.bind(this, 'lastname')
        },
        ...oldFields,
        password2: {
          id: 'password2',
          type: 'password',
          label: i18n.__('orders.retype') + i18n.__('validate.fields.password'),
          required: true,
          onChange: this.handleChange.bind(this, 'password2')
        }
      }
    }
    return super.fields()
  }

  signUp (options = {}) {
    const { firstname, username, lastname, password, password2 } = this.state
    const user = new SimpleUser()
    user.set({
      username,
      emails: [{}],
      profile: {
        firstname,
        lastname
      }
    })
    try {
      user.validate()
    } catch (e) {
      this.showMessage(capitalizeFirstLetter(e.details[0].message), 'warning')
      return
    }

    if (password !== password2) {
      this.showMessage(capitalizeFirstLetter(i18n.__('errors.passwordnomatch')))
      return
    }

    options.profile = Object.assign(options.profile || {}, {
      firstname,
      lastname
    })
    super.signUp(options)
  }
}

RichLoginForm.propTypes = {
  formState: PropTypes.symbol.isRequired
}

RichLoginForm.contextTypes = {
  ROUTES: PropTypes.object.isRequired,
  nav: PropTypes.func.isRequired
}

export default RichLoginForm
