const prefix = 'MEDIA_NODE_'

const AUTH = Symbol(prefix + 'AUTH')
const AUTH_FAIL = Symbol(prefix + 'AUTH_FAIL')
const AUTH_OK = Symbol(prefix + 'AUTH_OK')
const REQUEST_AUTO_AUTH = Symbol(prefix + 'REQUEST_AUTO_AUTH')
const RESET = Symbol(prefix + 'RESET')

export { RESET, AUTH, REQUEST_AUTO_AUTH, AUTH_FAIL, AUTH_OK }
