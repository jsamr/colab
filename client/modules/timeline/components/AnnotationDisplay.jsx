import React, { PropTypes, Component } from 'react'
import Hoverable from '/imports/ui/Hoverable'
import { SvgHover } from '/imports/ui/FastHover'
import Chip from 'material-ui/Chip'
import contrast from 'font-color-contrast'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import autobind from 'autobind-decorator'
import { transitionSlow } from '/imports/styles'
import map from 'lodash/map'
import reduce from 'lodash/reduce'

function createMultipleColorsBg (colors) {
  let percent = 0
  let slice = 100 / colors.length
  return colors.length ? 'linear-gradient(' + reduce(colors, (stack, next) => `${stack ? stack + ',' : ''} ${next} ${Math.floor(percent++ * slice)}%, ${next} ${Math.floor(percent * slice)}%`, null ) + ')' : 'transparent'
}

const CategorySticker = ({ category }) => {
  const { name, color } = category
  return (
    <Chip style={{ background: color, color: contrast(color) }}
          labelStyle={{ textTransform: 'lowercase', fontSize: 14, lineHeight: '18px' }}
    >
      {name}
    </Chip>
  )
}

const AnnotationButton = ({ annotation, ...props } ) => {
  const background = createMultipleColorsBg(map(annotation.categories, 'color'))
  return (
    <IconButton style={{ left: '0', width: 28, height: 28, padding: 0, zIndex: 1, background, textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }} {...props} >
      <FontIcon className='fa fa-tag' style={{ fontSize: 18 }}/>
    </IconButton>
  )
}

@autobind
class AnnotationDisplay extends Hoverable {

  static contextTypes = {
    theme: PropTypes.object.isRequired
  }

  renderHoverbox () {
    const { annotation } = this.props
    const { hovered } = this.state
    return (
      <SvgHover style={{ opacity: hovered ? 1 : 0, zIndex: 10000, display: hovered ? 'block' : 'none', position: 'absolute', left: 36, marginLeft: 3, ...transitionSlow}}>
        <div>
          <div style={{ display: 'flex' }}>
            {annotation.categories.map((category) => <CategorySticker key={category._id} category={category} />)}
          </div>
          <div>
            {annotation.observations}
          </div>
        </div>
      </SvgHover>
    )
  }

  renderAnnotation () {
    const { annotation } = this.props
    const { categories } = annotation
    const { theme } = this.context
    let categoriesDisplay
    categoriesDisplay = (
      <rect
        x='0'
        y='10%'
        height='90%'
        width='1'
        fill={theme.palette.textColor}/>
    )
    return categoriesDisplay
  }

  render () {
    const { annotation, viewBox } = this.props
    const { rawMinutes } = annotation
    let categoriesDisplay = this.renderAnnotation()
    return (
      <g transform={`translate(${rawMinutes})`}>
        <svg viewBox={viewBox} >
          <g>
            <switch>
              <foreignObject y='0' width="100%" height="100%" requiredFeatures='http://www.w3.org/TR/SVG11/feature#Extensibility'>
                <div xmlns='http://www.w3.org/1999/xhtml'
                     style={{ position: 'fixed', top: 0, zIndex: 1 }}
                >
                  {this.renderHoverbox()}
                  <AnnotationButton annotation={annotation}
                                    onMouseLeave={this.onMouseLeave}
                                    onMouseEnter={this.onMouseEnter}/>
                </div>
              </foreignObject>
              <text y={20} fill='white' >
                <tspan>Ce navigateur ne supporte pas</tspan>
                <tspan>les extensions SVG nécessaires!</tspan>
              </text>
            </switch>
            <g>
              {categoriesDisplay}
            </g>
          </g>
        </svg>
      </g>
    )
  }
}

export default AnnotationDisplay
