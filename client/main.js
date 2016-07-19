import 'meteor/svein:serrurier-reporter-paranoid'
import '/imports/cadenas'
import '/imports/init-behaviors'
// import '/imports/unsecure-login-mock'
import { createApp } from 'mantra-core'
import initContext from './configs/context'
import { routerReducer } from 'react-router-redux'

import { combineReducers } from 'redux'

import coreModule from './modules/core'
import authModule from './modules/auth'
import mediaModule from './modules/medianode'

const reducers = {
  ...coreModule.reducer,
  ...authModule.reducer,
  ...mediaModule.reducer,
  routing: routerReducer
}

console.info('reducers', Object.keys(reducers))
const reducer = combineReducers(reducers)

const context = initContext({ reducer })

const app = createApp(context)

app.loadModule(coreModule)
app.loadModule(authModule)
app.loadModule(mediaModule)

app.init()
