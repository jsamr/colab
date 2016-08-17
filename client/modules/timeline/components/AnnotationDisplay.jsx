import React, { PropTypes } from 'react'
import Chip from 'material-ui/Chip'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import map from 'lodash/map'

import { createMultipleColorsBg, findBestContrastedColor } from '../libs/colors-utils'

const CategorySticker = ({ category }) => {
  const { name, color } = category
  return (
    <Chip style={{ background: color, margin: 2 }}
          labelStyle={{ textTransform: 'lowercase', fontSize: 14, lineHeight: '18px', color: findBestContrastedColor(color) }}
    >
      {name}
    </Chip>
  )
}

const AnnotationButton = ({ annotation, tooltip, ...props }) => {
  const background = createMultipleColorsBg(map(annotation.categories, 'color'))
  return (
    <IconButton
      tooltip={tooltip}
      style={{ left: '0', width: 28, height: 28, padding: 0, zIndex: 1, background }}
      {...props} >
      <FontIcon className='fa fa-tag text-stroke' style={{ fontSize: 18 }}/>
    </IconButton>
  )
}

AnnotationButton.propTypes = {
  annotation: PropTypes.object.isRequired,
  tooltip: PropTypes.node
}

const HoverBox = ({ annotation }, { theme }) => {
  return (annotation.categories.length || annotation.observations) ? (
    <div style={{ textShadow: 'none', minWidth: 300, maxWidth: '50vw' }}>
      <div className='StickerContainer' style={{ display: 'flex', margin: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        {annotation.categories.map((category) => <CategorySticker key={category._id} category={category} />)}
      </div>
      <div style={{ fontSize: 14, fontStyle: 'italic', color: theme.palette.textColor, background: theme.palette.primary1Color, padding: 5, paddingLeft: 20, position: 'relative' }}>
        <FontIcon className='mdi mdi-note-text' style={{ position: 'absolute', top: 0, left: 0, fontSize: 20 }}/>
        {annotation.observations}
      </div>
    </div>
  ) : null
}

HoverBox.contextTypes = {
  theme: PropTypes.object.isRequired
}

HoverBox.propTypes = {
  annotation: PropTypes.object.isRequired
}

const AnnotationDisplay = ({ annotation, viewBox }, { theme }) => {
  const { rawMinutes } = annotation
  return (
    <g transform={`translate(${rawMinutes})`}>
      <svg viewBox={viewBox} >
        <g>
          <foreignObject y='0' width="100%" height="100%">
            <div xmlns='http://www.w3.org/1999/xhtml'
                 style={{ position: 'fixed', top: 0, zIndex: 1 }}
            >
              <AnnotationButton tooltip={<HoverBox annotation={annotation}/>}
                                annotation={annotation}
                                onMouseLeave={this.onMouseLeave}
                                onMouseEnter={this.onMouseEnter}/>
            </div>
          </foreignObject>
          <g>
            <rect
              x='0'
              y='10%'
              height='90%'
              width='1'
              fill={theme.palette.textColor}/>
          </g>
        </g>
      </svg>
    </g>
  )
}

AnnotationDisplay.contextTypes = {
  theme: PropTypes.object.isRequired
}

AnnotationDisplay.propTypes = {
  annotation: PropTypes.object.isRequired,
  viewBox: PropTypes.string.isRequired
}

export default AnnotationDisplay
