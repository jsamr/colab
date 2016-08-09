import { reportUpdateWidth, reportUpdateHeight, reportSubscriptionReady } from './actionsCreators'

const window = {
  setHeight ({ Store }, height) {
    Store.dispatch(reportUpdateHeight(height))
  },
  setWidth ({ Store }, width) {
    Store.dispatch(reportUpdateWidth(width))
  }
}

const sub = {
  notifyReady ({ Store }) {
    Store.dispatch(reportSubscriptionReady())
  }
}

export default {
  window,
  sub
}
