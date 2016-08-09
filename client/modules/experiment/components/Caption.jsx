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

  renderError () {
    const { theme } = this.context
    return <Warning color={theme.palette.warningColor} />
  }

  renderPlaceFeedback (error, comments, show) {
    const info = comments ? this.renderInfo(comments) : null
    const warn = error ? this.renderError(error) : null
    return <div style={{ display: 'flex', opacity: show ? 1 : 0.5, ...transitionFast }}>{warn}{info}</div>
  }

  renderFeedback (meta) {
    const { error, comments } = meta
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
    return (
      <div>
        {errorLine}
        {commentsLine}
      </div>
    )
  }

  render () {
    const { caption, value, style, ...props } = this.props
    const { hovered } = this.state
    const { place, meta = {}, fileFound = true } = caption
    const { error = false, comments = false } = meta
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
            <span>{place}</span>
            {this.renderPlaceFeedback(error, comments, !showFeedback)}
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

