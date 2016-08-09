import { createAction } from 'redux-actions'

import {
  WINDOW_HEIGHT_UPDATE,
  WINDOW_WIDTH_UPDATE,
  START_MEDIA_NODE_AUTH,
  NOTIFY_SUBSCRIPTION_READY
} from './actionsTypes'

const reportUpdateWidth = createAction(WINDOW_WIDTH_UPDATE)
const reportUpdateHeight = createAction(WINDOW_HEIGHT_UPDATE)
const requestMediaNodeAuth = createAction(START_MEDIA_NODE_AUTH)
const reportSubscriptionReady = createAction(NOTIFY_SUBSCRIPTION_READY)

export {
  reportSubscriptionReady,
  reportUpdateHeight,
  reportUpdateWidth,
  requestMediaNodeAuth
}

