import * as actions from './actions'
import * as reducer from './reducer.js'
import { CurrentUser } from '/imports/api/User'
import authSaga from './libs/auth-saga'
export default {
  actions,
  reducer,
  load (context) {
    const { Meteor, Store, Tracker, sagaMiddleWare } = context
    Tracker.autorun(() => {
      const userSub = Meteor.subscribe('currentuser')
      if (userSub.ready()) {
        Store.dispatch(actions.update(CurrentUser.findOne(Meteor.userId())))
        console.warn('UPDATING USER ', Meteor.user())
      }
    })
    sagaMiddleWare.run(authSaga, context)
  }
}
