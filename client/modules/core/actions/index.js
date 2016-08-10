import { reportUpdateWidth, reportUpdateHeight, reportSubscriptionReady, reportTopBarHeightUpdate } from './actionsCreators'

const window = {
  setHeight ({ Store }, height) {
    Store.dispatch(reportUpdateHeight(height))
  },
  setWidth ({ Store }, width) {
    Store.dispatch(reportUpdateWidth(width))
  },
  setTopBarHeight ({ Store }, height) {
    Store.dispatch(reportTopBarHeightUpdate(height))
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
