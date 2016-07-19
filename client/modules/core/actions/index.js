import { WINDOW_HEIGHT_UPDATE, WINDOW_WIDTH_UPDATE, NOTIFY_SUBSCRIPTION_READY } from './actionTypes'

export function setWinHeight (height) {
  return { type: WINDOW_HEIGHT_UPDATE, height }
}

export function setWinWidth (width) {
  return { type: WINDOW_WIDTH_UPDATE, width }
}

export function notifySubReady () {
  return { type: NOTIFY_SUBSCRIPTION_READY }
}