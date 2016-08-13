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
      sourcesListBackground: 'rgba(10, 10, 10, 0.15)',
      padding: 5
    },
    application: {
      background: palette.pageBackground
    }
  })
}
