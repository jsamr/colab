import {
  AUTO_UPDATE_PLAYER_LOAD_STATUS,
  AUTO_UPDATE_PLAYER_DURATION,
  SET_PLAYER_PLAYING_STATE,
  USER_SET_PLAYER_CURSOR,
  SET_VOLUME_LEVEL
} from './actionsTypes'

const video = {
  autoUpdatePlayerLoadStatus ({ Store }, newValue) {
    Store.dispatch({
      type: AUTO_UPDATE_PLAYER_LOAD_STATUS,
      payload: newValue
    })
  },
  autoUpdatePlayerDuration ({ Store }, duration) {
    Store.dispatch({
      type: AUTO_UPDATE_PLAYER_DURATION,
      payload: duration
    })
  },
  userSelectPlayerCursor ({ Store }, newValue) {
    Store.dispatch({
      type: USER_SET_PLAYER_CURSOR,
      payload: newValue
    })
  },
  setPlayingState ({ Store }, playingState) {
    Store.dispatch({
      type: SET_PLAYER_PLAYING_STATE,
      payload: playingState
    })
  },
  setVolumeLevel ({ Store }, volumeLevel) {
    Store.dispatch({
      type: SET_VOLUME_LEVEL,
      payload: volumeLevel
    })
  }
}

export {
  video
}
