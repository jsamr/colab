import React, { PropTypes } from 'react'
import Chip from 'material-ui/Chip'
import FontIcon from 'material-ui/FontIcon'
import map from 'lodash/map'
import Hoverable from '/imports/ui/Hoverable'
import { createMultipleColorsBg, findBestContrastedColor } from '../libs/colors-utils'

const CategorySticker = ({ category }, { muiTheme }) => {
  const { name, color } = category
  return (
    <Chip style={{ background: color, margin: 2 }}
          labelStyle={{ color: findBestContrastedColor(color), ...muiTheme.categoryStickerLabel }}
    >
      {name}
    </Chip>
  )
}

CategorySticker.propTypes = {
  category: PropTypes.object.isRequired
}

CategorySticker.contextTypes = {
  muiTheme: PropTypes.object.isRequired
}

class AnnotationButton extends Hoverable {

  static propTypes = {
    annotation: PropTypes.object.isRequired,
    tooltip: PropTypes.node
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  render () {
    const { annotation, tooltip, ...props } = this.props
    const { muiTheme } = this.context
    const { hovered } = this.state
    const background = createMultipleColorsBg(map(annotation.categories, 'color'))
    return (
      <div onMouseEnter={this.onMouseEnter}
           onMouseLeave={this.onMouseLeave}
           style={{ zIndex: 'inherit' }} >
        <SmallIconButton
          iconClass='mdi mdi-tooltip-text text-stroke'
          iconSize={18}
          style={{ left: -muiTheme.smallIconButton.width / 2, zIndex: hovered ? 2 : 0, background, position: 'absolute', borderRadius: '50%' }}
          {...props}  />
        <div style={{ display: hovered && tooltip ? 'block' : 'none', ...muiTheme.timeLine.hoverBoxContainer, zIndex: 1 }}>
          {tooltip}
        </div>
      </div>
    )
  }
}

const SmallIconButton = ({ iconClass, iconSize, style, ...props }, { muiTheme }) => (
  <div style={{ ...muiTheme.smallIconButton, ...style }} {...props} >
    <FontIcon style={{ fontSize: iconSize ? iconSize : muiTheme.smallIconButton.width }} className={iconClass} />
  </div>
)

SmallIconButton.propTypes = {
  iconClass: PropTypes.string.isRequired,
  style: PropTypes.object,
  iconSize: PropTypes.number
}

SmallIconButton.contextTypes = {
  muiTheme: PropTypes.object.isRequired
}

const HoverBox = ({ annotation, style }, { theme, muiTheme }) => {
  const borderStyle = `2px solid ${theme.palette.primary1Color}`
  const containerStyle = {
    fontSize: 14,
    fontStyle: 'italic',
    color: theme.palette.primary1Color,
    margin: 2,
    position: 'relative',
    textAlign: 'center',
    borderTop: borderStyle,
    display: 'flex',
    alignItems: 'center',
    padding: 5,
    paddingLeft: 0
  }
  return (annotation.categories.length || annotation.observations) ? (
    <div style={{ minWidth: 300, maxWidth: '50vw', ...style }}>
      <div style={{ background: theme.palette.primary1Color, display: 'flex', alignItems: 'center', paddingLeft: muiTheme.smallIconButton.width }}>
        <span style={{ fontFamily: 'monospace', fontSize: 20 }}>{annotation.readableMinutes()}</span>
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <SmallIconButton iconClass='mdi mdi-play-circle' />
          <SmallIconButton iconClass='mdi mdi-pencil-box' />
        </div>
      </div>
      <div style={{ display: 'flex', ...containerStyle }}>
        <FontIcon className='fa fa-tag'
                  style={muiTheme.timeLine.icon}/>
        <div className='StickerContainer'>
          {annotation.categories.map((category) => <CategorySticker key={category._id} category={category} />)}
        </div>
      </div>
      <div style={{
        ...containerStyle,
        borderBottom: borderStyle
      }}>
        <FontIcon className='mdi mdi-eye'
                  style={muiTheme.timeLine.icon}/>
        {annotation.observations}
      </div>
    </div>
  ) : null
}

HoverBox.contextTypes = {
  theme: PropTypes.object.isRequired,
  muiTheme: PropTypes.object.isRequired
}

HoverBox.propTypes = {
  annotation: PropTypes.object.isRequired
}

const AnnotationDisplay = ({ annotation, pxpm, height }, { theme }) => {
  const { rawMinutes } = annotation
  return (
    <div style={{ position: 'relative', top: 0, left: rawMinutes * pxpm }}
    >
      <div style={{ background: theme.palette.primary1Color, height, width: 1, position: 'absolute' }}>
        <AnnotationButton tooltip={<HoverBox style={{ maxHeight: height }} annotation={annotation} />}
                          annotation={annotation}
                          onMouseLeave={this.onMouseLeave}
                          onMouseEnter={this.onMouseEnter}/>

      </div>
    </div>
  )
}

AnnotationDisplay.contextTypes = {
  theme: PropTypes.object.isRequired
}

AnnotationDisplay.propTypes = {
  annotation: PropTypes.object.isRequired,
  pxpm: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

export default AnnotationDisplay
