import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { createStore, applyMiddleware, compose } from 'redux'
import { Accounts, STATES as ACCOUNT_STATES } from 'meteor/std:accounts-ui';
import Logger from '/imports/Logger'
import createSagaMiddleware from 'redux-saga'
import * as CONF from './params'
const sagaMiddleWare = createSagaMiddleware()

const logger = new Logger('redux')

const loggerMiddleware = store => next => action => {
  let result = next(action)
  logger.debug('dispatching', action, ' with next state', store.getState())
  return result
}

const defaultState = {}

export default function ({ reducer }) {
  const store = createStore(
    reducer,
    defaultState,
    applyMiddleware(sagaMiddleWare, loggerMiddleware)
  )
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
  })
  return {
    Accounts,
    ACCOUNT_STATES,
    Meteor,
    Logger,
    Tracker,
    Store: store,
    CONF: CONF,
    sagaMiddleWare
  }
}
