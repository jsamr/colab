import getMuiTheme from 'material-ui/styles/getMuiTheme'
import merge from 'lodash/merge'
import { fade } from 'material-ui/utils/colorManipulator'

export default function getExtendedMuiTheme (theme, ...more) {
  const baseTheme = getMuiTheme(...arguments)
  const {spacing, fontFamily, palette} = theme
  const mediaBackground = palette.primary2Color
  return merge(baseTheme, {
    experiment: {
      background: palette.pageBackground,
      mediaBackground,
      mediaControlsBackground: fade(mediaBackground, 0.7),
      timeLineBackground: palette.primary3Color,
      sourcesListBackground: palette.primary1Color,
      padding: 5
    },
    application: {
      background: palette.pageBackground
    }
  })
}
