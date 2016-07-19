import * as actions from './actions'
import * as reducer from './configs/reducer.js'

export default {
  actions,
  reducer,
  load ({ Meteor, Accounts, Store }) {
    function getUserCredentials () {
      return {
        user: Meteor.user(),
        id: Meteor.userId()
      }
    }
    const onLogin = () => Store.dispatch(actions.login(getUserCredentials()))
    Accounts.onLogin(onLogin)
    Accounts.onLogout(() => Store.dispatch(actions.logout()))
  }
}
