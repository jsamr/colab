import getMuiTheme from 'material-ui/styles/getMuiTheme'
import merge from 'lodash/merge'

export default function getExtendedMuiTheme (theme, ...more) {
  const baseTheme = getMuiTheme(...arguments)
  const {spacing, fontFamily, palette} = theme
  return merge(baseTheme, {
    experiment: {
      background: palette.pageBackground,
      mediaBackground: palette.primary2Color,
      timeLineBackground: palette.primary3Color,
      sourcesListBackground: palette.primary1Color,
      padding: 5
    },
    application: {
      background: palette.pageBackground
    }
  })
}
