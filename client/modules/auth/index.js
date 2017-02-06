import actions from './actions'
import * as reducer from './reducer'
import { CurrentUser } from '/imports/api/User'
import authSaga from './libs/auth-saga'

export default {
  actions,
  reducer,
  load (context, { auth }) {
    const { Meteor, Tracker, sagaMiddleWare } = context
    Tracker.autorun(() => {
      const userSub = Meteor.subscribe('currentuser')
      if (userSub.ready()) {
        auth.update(CurrentUser.findOne(Meteor.userId()))
      }
    })
    sagaMiddleWare.run(authSaga, context)
  }
}
