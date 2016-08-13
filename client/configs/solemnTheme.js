import {
  grey900,
  lightGreen500,
  redA700,
  amber500,
  lightBlue900,
  cyan800
} from 'material-ui/styles/colors'
import { fade, lighten } from 'material-ui/utils/colorManipulator'
import spacing from 'material-ui/styles/spacing'

const jet = '#323031'
const darkSeaGreen = '#89B6A5'
const aeroBlue = '#C9EDDC'
const dolphinGray = '#82968C'
const dimGray = '#6A706E'
const primary1 = jet
const secondary1 = darkSeaGreen
const theme = {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: primary1,
    primary2Color: secondary1,
    primary3Color: dolphinGray,
    accent1Color: cyan800,
    accent2Color: dimGray,
    accent3Color: dolphinGray,
    textColor: aeroBlue,
    alternateTextColor: lighten(aeroBlue, 0.12),
    highContrastTextColor: primary1,
    canvasColor: grey900,
    borderColor: grey900,
    disabledColor: fade(grey900, 0.3),
    pickerHeaderColor: darkSeaGreen,
    clockCircleColor: fade(grey900, 0.07),
    shadowColor: secondary1,
    headerColor: secondary1,
    successColor: lightGreen500,
    failureColor: redA700,
    warningColor: amber500,
    infoColor: lightBlue900,
    controlsColor: fade(grey900, 0.18),
    pageBackground: primary1
  }
}

export default theme
