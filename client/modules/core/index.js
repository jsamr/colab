import * as actions from './actions'
import * as reducer from './reducer.js'
import routes from './routes.jsx'
import syncSaga from './libs/sync-saga'
export default {
  actions,
  reducer,
  routes,
  load ({ sagaMiddleWare }) {
    sagaMiddleWare.run(syncSaga)
  }
}
