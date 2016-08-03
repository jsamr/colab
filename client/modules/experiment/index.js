import actions from './actions'
import reducer from './reducer'
import expSaga from './libs/exp-saga'

function load (context) {
  const { sagaMiddleWare } = context
  sagaMiddleWare.run(expSaga, context)
}

export {
  actions,
  reducer,
  load
}
