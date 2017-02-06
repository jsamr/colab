import {
  deepOrange600,
  grey900,
  lightGreen500,
  redA700,
  amber500,
  lightBlue900
} from 'material-ui/styles/colors'
import { fade, lighten } from 'material-ui/utils/colorManipulator'
import spacing from 'material-ui/styles/spacing'

const metallicSeaweed = '#177E89'
const midnightGreen = '#084C61'
const mustard = '#FFC857'
const jet = '#323031'
const primary1 = deepOrange600

const theme = {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: primary1,
    primary2Color: metallicSeaweed,
    primary3Color: midnightGreen,
    accent1Color: mustard,
    accent2Color: jet,
    accent3Color: jet,
    textColor: 'white',
    alternateTextColor: grey900,
    highContrastTextColor: primary1,
    canvasColor: lighten(primary1, 0.26),
    borderColor: grey900,
    disabledColor: fade(grey900, 0.3),
    pickerHeaderColor: metallicSeaweed,
    clockCircleColor: fade(grey900, 0.07),
    shadowColor: metallicSeaweed,
    headerColor: metallicSeaweed,
    successColor: lightGreen500,
    failureColor: redA700,
    warningColor: amber500,
    infoColor: lightBlue900,
    controlsColor: fade('#000', 0.850),
    pageBackground: primary1
  }
}

export default theme
