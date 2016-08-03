import React, { PropTypes, Component } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FontIcon from 'material-ui/FontIcon'
import Slider from 'material-ui/Slider'
import { fInlineAround, transitionSlow } from '/imports/styles'
import autobind from 'autobind-decorator'

@autobind
class VolumeControl extends Component {

  constructor (props) {
    super(props)
    this.state = {
      hovered: false,
      cachedVolumeLevel: 1
    }
  }

  handleMouseLeave () {
    this.setState({
      hovered: false
    })
  }

  handleMouseEnter () {
    this.setState({
      hovered: true
    })
  }

  setVolumeLevel (level) {
    const { setVolumeLevel } = this.props
    setVolumeLevel(level)
    if (level !== 0) {
      this.setState({
        cachedVolumeLevel: level
      })
    }
  }

  render () {
    const { theme } = this.context
    const { setVolumeLevel, volumeLevel, style, preferedWidth = 200 } = this.props
    const { hovered, cachedVolumeLevel } = this.state
    const clazz = volumeLevel ? 'fa-volume-up' : 'fa-volume-off'
    let sliderStyle = hovered ? { flexGrow: 1 } : { flexGrow: 0, width: 0, display: 'none' }
    let basis = hovered ? preferedWidth : 60
    return (
      <div style={{ flexBasis: basis, ...fInlineAround, alignItems: 'center', justifyContent: 'flex-start', margin: '0 10px', ...transitionSlow }}
           onMouseEnter={this.handleMouseEnter}
           onMouseLeave={this.handleMouseLeave}
      >
        <FloatingActionButton style={style} backgroundColor={theme.palette.primary1Color }
                              mini={true}
                              onClick={() => setVolumeLevel(volumeLevel ? 0 : cachedVolumeLevel)}
        >
          <FontIcon className={`fa ${clazz}`} />
        </FloatingActionButton>
        <Slider style={{ marginLeft: 10, ...sliderStyle }}
                sliderStyle={{ marginTop: 0, marginBottom: 0 }}
                value={volumeLevel}
                onChange={(e, level) => this.setVolumeLevel(level)}
        />
      </div>
    )
  }
}

VolumeControl.propTypes = {
  setVolumeLevel: PropTypes.func.isRequired,
  volumeLevel: PropTypes.number.isRequired,
  preferedWidth: PropTypes.number
}
VolumeControl.contextTypes = {
  theme: PropTypes.object.isRequired
}
export default VolumeControl
