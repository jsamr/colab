import { teal200,
  blueGrey900,
  blueGrey500,
  blueGrey300,
  grey700,
  cyan500,
  brown900,
  brown700,
  indigo700,
  indigo400,
  indigo300,
  amber600,
  amber800,
  grey100,
  grey300,
  darkBlack,
  fullBlack,
  lightGreen500,
  amber500,
  grey500,
  red700,
  grey900,
  blue700,
  lightBlue900
} from 'material-ui/styles/colors'
import { fade, lighten } from 'material-ui/utils/colorManipulator'
import spacing from 'material-ui/styles/spacing'

const primary1 = blueGrey900

const theme = {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: primary1,
    primary2Color: blueGrey500,
    primary3Color: blueGrey300,
    accent1Color: indigo300,
    accent2Color: darkBlack,
    accent3Color: brown900,
    accent4Color: indigo700,
    textColor: grey100,
    alternateTextColor: grey300,
    canvasColor: lighten(primary1, 0.26),
    borderColor: brown900,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: grey500,
    headerColor: darkBlack,
    successColor: lightGreen500,
    failureColor: red700,
    warningColor: amber500,
    infoColor: lightBlue900,
    controlsColor: fade(primary1, 0.38)
  }
}

export default theme
