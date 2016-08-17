import reduce from 'lodash/reduce'
import { getContrastRatio } from 'material-ui/utils/colorManipulator'

const BLACK = '#000'
const WHITE = '#FFF'

function createMultipleColorsBg (colors) {
  let percent = 0
  let slice = 100 / colors.length
  return colors.length ? 'linear-gradient(' + reduce(colors, (stack, next) => `${stack ? stack + ',' : ''} ${next} ${Math.floor(percent++ * slice)}%, ${next} ${Math.floor(percent * slice)}%`, null ) + ')' : 'transparent'
}

function findBestContrastedColor (color) {
  const ratio = getContrastRatio(color, BLACK)
  let selectedColor = ratio > 4.5 ? BLACK : WHITE
  return selectedColor
}

export {
  createMultipleColorsBg,
  findBestContrastedColor
}
