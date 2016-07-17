import MediaNodeConfig from './MediaNodeConfig'
import { getConfig } from '../api/Config'

export default class ColabMediaConf extends MediaNodeConfig {
  getCredentials (state) {
    const auth = state.auth
    const credentials = {
      user: auth.id,
      hash: auth.user.services.password.bcrypt
    }
    return credentials
  }
  getRootUrl () {
    return getConfig().videoServer.url
  }
}
