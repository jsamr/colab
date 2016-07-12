const prefix = 'MEDIA_NODE_';

const AUTH = Symbol( prefix+'AUTH' ),
      AUTH_FAIL = Symbol( prefix+'AUTH_FAIL' ),
      AUTH_OK = Symbol( prefix+'AUTH_OK' ),
      REQUEST_AUTO_AUTH = Symbol( prefix+'REQUEST_AUTO_AUTH' ),
      RESET = Symbol( prefix+'RESET');

export {
    RESET,
    AUTH,
    REQUEST_AUTO_AUTH,
    AUTH_FAIL,
    AUTH_OK
}