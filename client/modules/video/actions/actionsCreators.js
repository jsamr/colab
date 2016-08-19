import { createAction } from 'redux-actions'
import identity from 'lodash/identity'

import {
  AUTO_UPDATE_PLAYER_LOAD_STATUS,
  AUTO_UPDATE_PLAYER_DURATION,
  USER_SET_PLAYER_CURSOR,
  SET_PLAYER_PLAYING_STATE,
  SET_VOLUME_LEVEL,
  VIDEO_LOAD_URL,
  VIDEO_CLEAR
} from './actionsTypes'

const reportUpdatePlayerLoadStatus = createAction(AUTO_UPDATE_PLAYER_LOAD_STATUS)
const reportUpdatePlayerDuration = createAction(AUTO_UPDATE_PLAYER_DURATION)
const setPlayerCursor = createAction(USER_SET_PLAYER_CURSOR, identity, (cursor, isAbsolute = false) => ({ isAbsolute }))
const setPlayingState = createAction(SET_PLAYER_PLAYING_STATE)
const setVolumeLevel = createAction(SET_VOLUME_LEVEL)
const requestVideoLoadUrl = createAction(VIDEO_LOAD_URL)
const requestVideoClear = createAction(VIDEO_CLEAR)

export {
  reportUpdatePlayerDuration,
  reportUpdatePlayerLoadStatus,
  setPlayerCursor,
  setPlayingState,
  setVolumeLevel,
  requestVideoLoadUrl,
  requestVideoClear
}
