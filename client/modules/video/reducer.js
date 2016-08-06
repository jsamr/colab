import {
  AUTO_UPDATE_PLAYER_LOAD_STATUS,
  AUTO_UPDATE_PLAYER_DURATION,
  SET_PLAYER_PLAYING_STATE,
  USER_SET_PLAYER_CURSOR,
  SET_VOLUME_LEVEL,
  VIDEO_LOAD_URL,
  VIDEO_CLEAR
} from './actions/actionsTypes'

import merge from 'lodash/merge'
import pick from 'lodash/pick'
import { enforceInInterval } from '/imports/math'

const defaultState = {
  userCursor: 0,
  played: 0,
  loaded: 0,
  duration: 0,
  isPlaying: false,
  player: null,
  volumeLevel: 1,
  url: undefined
}

function video (state = defaultState, { type, payload, meta = {} }) {
  switch (type) {
    case AUTO_UPDATE_PLAYER_LOAD_STATUS: return { ...state, played: payload.played, loaded: payload.loaded }
    case AUTO_UPDATE_PLAYER_DURATION: return { ...state, duration: payload }
    case SET_PLAYER_PLAYING_STATE: return { ...state, isPlaying: payload }
    case USER_SET_PLAYER_CURSOR: return { ...state, userCursor: payload }
    case VIDEO_LOAD_URL:
      const isDefault = meta.default === true
      if (isDefault) return merge({ url: payload }, state)
      else return merge({}, state, { url: payload })
    case SET_VOLUME_LEVEL: return { ...state, volumeLevel: enforceInInterval(payload, 0, 1) }
    case VIDEO_CLEAR: return { ...defaultState, ...pick(state, ['volumeLevel', 'userCursor']) }
    default: return state
  }
}

export {
  video
}
