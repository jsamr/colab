import { WINDOW_HEIGHT_UPDATE, WINDOW_WIDTH_UPDATE, NOTIFY_SUBSCRIPTION_READY } from './actionTypes'

const window = {
  setHeight ({ Store }, height) {
    Store.dispatch({ type: WINDOW_HEIGHT_UPDATE, height })
  },
  setWidth ({ Store }, width) {
    Store.dispatch({ type: WINDOW_WIDTH_UPDATE, width })
  }
}

const sub = {
  notifyReady ({ Store }) {
    Store.dispatch({ type: NOTIFY_SUBSCRIPTION_READY })
  }
}

export default {
  window,
  sub
}
