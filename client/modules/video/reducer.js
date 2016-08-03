import {
  AUTO_UPDATE_PLAYER_LOAD_STATUS,
  AUTO_UPDATE_PLAYER_DURATION,
  SET_PLAYER_PLAYING_STATE,
  USER_SET_PLAYER_CURSOR,
  SET_VOLUME_LEVEL
} from './actions/actionsTypes'

import { enforceInInterval } from '/imports/math'

const defaultState = {
  userCursor: 0,
  played: 0,
  loaded: 0,
  duration: 0,
  isPlaying: false,
  player: null,
  volumeLevel: 1
}

function video (state = defaultState, { type, payload }) {
  switch (type) {
    case AUTO_UPDATE_PLAYER_LOAD_STATUS: return { ...state, played: payload.played, loaded: payload.loaded }
    case AUTO_UPDATE_PLAYER_DURATION: return { ...state, duration: payload }
    case SET_PLAYER_PLAYING_STATE: return { ...state, isPlaying: payload }
    case USER_SET_PLAYER_CURSOR: return { ...state, userCursor: payload }
    case SET_VOLUME_LEVEL: return { ...state, volumeLevel: enforceInInterval(payload, 0, 1) }
    default: return state
  }
}

export {
  video
}
