import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import mediaNodeReducer from './medianode/reducer'
import authReducer from './auth/reducer'
import medianodeSaga from './medianode/saga'
import ColabMediaConf from './medianode/ColabMediaConf'
import { METEOR_LOGIN, METEOR_LOGOUT } from './auth/actions'
import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'
import Logger from './Logger'

const logger = new Logger('redux')
const sagaMiddleWare = createSagaMiddleware()

const loggerMiddleware = store => next => action => {
  logger.debug('dispatching', action)
  let result = next(action)
  logger.debug('next state', store.getState())
  return result
}

const store = createStore(combineReducers({
  media: mediaNodeReducer,
  auth: authReducer
}), applyMiddleware(loggerMiddleware, sagaMiddleWare))

function userLogout () {
  store.dispatch({ type: METEOR_LOGOUT })
}

function userLogin () {
  store.dispatch({
    type: METEOR_LOGIN,
    value: {
      user: Meteor.user(),
      id: Meteor.userId()
    }
  })
}

Accounts.onLogout(userLogout)

Accounts.onLogin(userLogin)

sagaMiddleWare.run(medianodeSaga, new ColabMediaConf({
  appName: 'colab2',
  SYM_AUTH_ACTION: METEOR_LOGIN,
  SYM_RESET_ACTION: METEOR_LOGOUT,
  RETRY_AFTER_SECONDS: 10
}))

// user meteor defer to fasten ui lodading
Meteor.defer(() => {
  if (Meteor.user()) userLogin()
})

export default store
