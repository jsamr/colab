import React, { PropTypes } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FontIcon from 'material-ui/FontIcon'

const PlayPauseButton = ({ setPlayingState, isPlaying, preferredWidth = 60, style, theme }) => {
  const clazz = isPlaying ? 'fa-pause' : 'fa-play'
  return (
    <div style={{ flexBasis: preferredWidth, display: 'flex', justifyContent: 'center' }}>
      <FloatingActionButton style={style} backgroundColor={theme.main} mini={true} onClick={() => setPlayingState(!isPlaying)}>
        <FontIcon className={`fa ${clazz}`} />
      </FloatingActionButton>
    </div>
  )
}

PlayPauseButton.propTypes = {
  setPlayingState: PropTypes.func,
  isPlaying: PropTypes.bool.isRequired,
  preferredWidth: PropTypes.number,
  theme: PropTypes.object.isRequired
}

export default PlayPauseButton
