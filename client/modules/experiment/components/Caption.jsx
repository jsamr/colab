import React, { PropTypes, Component } from 'react'
import { ListItem } from 'material-ui/List'
import CaptionFeedback from '/imports/ui/indicators/CaptionFeedback'
import Warning from 'material-ui/svg-icons/alert/warning'
import FontIcon from 'material-ui/FontIcon'
import { transitionFast } from '/imports/styles'
import FastHover from '/imports/ui/FastHover'
import autobind from 'autobind-decorator'

// TODO remove ListItem etention and find a way to trigger selection change on click
@autobind
class Caption extends ListItem {

  static propTypes = {
    caption: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired
  }

  static contextTypes = {
    theme: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      hovered: false
    }
    this.type = {
      muiName: 'ListItem'
    }
  }

  handleHoverIn () {
    this.setState({
      hovered: true
    })
  }

  handleHoverOut () {
    this.setState({
      hovered: false
    })
  }

  renderInfo () {
    const { theme } = this.context
    return <FontIcon color={theme.palette.infoColor} className='mdi mdi-information'/>
  }

  renderWarning () {
    const { theme } = this.context
    return <Warning color={theme.palette.warningColor} />
  }

  renderSoundQ (soundQ) {
    const { theme } = this.context
    return <FontIcon color={ soundQ ? theme.palette.successColor : theme.palette.failureColor }
                     className={`mdi ${ soundQ ? 'mdi-volume-high' : 'mdi-volume-off' }`} />
  }

  renderError () {
    const { theme } = this.context
    return <Warning color={theme.palette.failureColor} />
  }

  renderPlaceFeedback ({ error, comments, warning, soundQ = 3 }, show) {
    const infoComponent = comments ? this.renderInfo(comments) : null
    const errorComponent = error ? this.renderError(error) : null
    const warningComponent = warning ? this.renderWarning() : null
    const soundQComponent = this.renderSoundQ(soundQ)
    return <div className='PlaceFeedbackContainer' style={{ display: 'flex', flexBasis: 130, justifyContent: 'flex-start', opacity: show ? 0.6 : 0.3, ...transitionFast }}>
      {soundQComponent}
      {errorComponent}
      {warningComponent}
      {infoComponent}
      </div>
  }

  renderFeedback (meta) {
    const { error, warning, comments } = meta
    const errorLine = error ? (
      <div style={{  }}>
        {this.renderError()}
        {error}
      </div>
    ) : null
    const commentsLine = comments ? (
      <div style={{  }}>
        {this.renderInfo()}
        {comments}
      </div>
    ) : null
    const warningLine = warning ? (
      <div style={{  }}>
        {this.renderWarning()}
        {warning}
      </div>
    ) : null
    return (
      <div>
        {errorLine}
        {warningLine}
        {commentsLine}
      </div>
    )
  }

  render () {
    const { caption, value, style, ...props } = this.props
    const { hovered } = this.state
    const { place, meta = {}, fileFound = true } = caption
    const hasFeedback = meta.error
    const showFeedback = hovered && hasFeedback
    return (
      <div value={value} style={{ position: 'relative' }}>
        <ListItem leftIcon={<div><CaptionFeedback isPresent={fileFound}/></div>}
                  {...props}
                  style={{ ...style, height: 50, position: 'relative' }}
                  onMouseEnter={this.handleHoverIn}
                  onMouseLeave={this.handleHoverOut}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: 2 }}>{place}</span>
            {this.renderPlaceFeedback(meta, !showFeedback)}
          </div>
        </ListItem>
        <FastHover style={{ opacity: showFeedback ? 1 : 0, ...transitionFast, zIndex: 1000 }}>
          {this.renderFeedback(meta)}
        </FastHover>
      </div>
    )
  }
}

export default Caption

