import {
  reportUpdatePlayerLoadStatus,
  reportUpdatePlayerDuration,
  requestVideoLoadUrl,
  setPlayingState,
  setVolumeLevel,
  setPlayerCursor
} from './actionsCreators'

const video = {
  autoUpdatePlayerLoadStatus ({ Store }, loadStatus) {
    Store.dispatch(reportUpdatePlayerLoadStatus(loadStatus))
  },
  autoUpdatePlayerDuration ({ Store }, duration) {
    Store.dispatch(reportUpdatePlayerDuration(duration))
  },
  userSelectPlayerCursor ({ Store }, cursor) {
    Store.dispatch(setPlayerCursor(cursor))
  },
  setPlayingState ({ Store }, playingState) {
    Store.dispatch(setPlayingState(playingState))
  },
  setVolumeLevel ({ Store }, volumeLevel) {
    Store.dispatch(setVolumeLevel(volumeLevel))
  },
  loadSourceUrl ({ Store }, url) {
    Store.dispatch(requestVideoLoadUrl(url))
  }
}

export {
  video
}
