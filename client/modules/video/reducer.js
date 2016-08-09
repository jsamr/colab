import { handleActions } from 'redux-actions'
import {
  AUTO_UPDATE_PLAYER_LOAD_STATUS,
  AUTO_UPDATE_PLAYER_DURATION,
  SET_PLAYER_PLAYING_STATE,
  USER_SET_PLAYER_CURSOR,
  SET_VOLUME_LEVEL,
  VIDEO_LOAD_URL,
  VIDEO_CLEAR
} from './actions/actionsTypes'

import pick from 'lodash/pick'

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

function reduceField (fieldName) {
  return (state, { payload }) => {
    return { ...state, [fieldName]: payload }
  }
}

const video = handleActions({
  [AUTO_UPDATE_PLAYER_LOAD_STATUS]: (state, { payload }) => ({ ...state, ...payload }),
  [AUTO_UPDATE_PLAYER_DURATION]: reduceField('duration'),
  [SET_PLAYER_PLAYING_STATE]: reduceField('isPlaying'),
  [USER_SET_PLAYER_CURSOR]: reduceField('userCursor'),
  [VIDEO_LOAD_URL]: reduceField('url'),
  [SET_VOLUME_LEVEL]: reduceField('volumeLevel'),
  [VIDEO_CLEAR]: (state, { payload }) => ({ ...defaultState, ...pick(state, ['volumeLevel', 'userCursor']) })
}, defaultState)

export {
  video
}
