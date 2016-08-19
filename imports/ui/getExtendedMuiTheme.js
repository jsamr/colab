import getMuiTheme from 'material-ui/styles/getMuiTheme'
import merge from 'lodash/merge'
import { TOPBAR_BOTTOM_BORDER_WIDTH } from '/client/configs/configuration'
import { fade } from 'material-ui/utils/colorManipulator'

export default function getExtendedMuiTheme (theme, ...more) {
  const baseTheme = getMuiTheme(...arguments)
  const {spacing, fontFamily, palette} = theme
  const mediaBackground = palette.primary2Color
  return merge(baseTheme, {
    topBar: {
      bottomBorder: TOPBAR_BOTTOM_BORDER_WIDTH
    },
    experiment: {
      background: palette.pageBackground,
      mediaBackground,
      mediaControlsBackground: fade(mediaBackground, 0.7),
      timeLineBackground: palette.primary3Color,
      sourcesListBackground: palette.primary1Color,
      padding: 5
    },
    categoryStickerLabel: {
      textTransform: 'lowercase',
      fontSize: 14,
      lineHeight: '18px'
    },
    smallIconButton: {
      width: 28,
      height: 28,
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    },
    timeLine: {
      icon: {
        fontSize: 18,
        marginRight: 5,
        color: palette.primary1Color,
        background: palette.textColor,
        alignSelf: 'flex-start'
      },
      button: {
        width: 28,
        height: 28,
        padding: 0
      },
      hoverBoxContainer: {
        position: 'absolute',
        top: 0,
        background: palette.textColor,
        zIndex: 0,
        padding: '0 1px'
      }
    },
    application: {
      background: palette.pageBackground
    }
  })
}
