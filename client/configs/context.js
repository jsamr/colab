import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { createStore, applyMiddleware, compose } from 'redux'
import { Accounts } from 'meteor/accounts-base'
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
  return {
    Accounts,
    Meteor,
    Logger,
    Tracker,
    Store: store,
    CONF: CONF,
    sagaMiddleWare
  }
}
