
const fColumnNoWrap = {
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'space-between'
}

const fColumnNoWrapCenter = {
  ...fColumnNoWrap,
  alignItems: 'center'
}

const fInlineNoWrap = {
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between'
}

const fInlineAround = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center'
}

const fInlineCenter = {
  display: 'flex',
  alignItems: 'center'
}

const fInlineNoWrapCentered = {
  display: 'flex',
  flexGrow: 'row wrap',
  justifyContent: 'flex-start',
  alignItems: 'center'
}

const transitionFast = {
  transition: 'all 0.41s ease'
}

const transitionSlow = {
  transition: 'all 0.66s ease'
}
const transitionVerySlow = {
  transition: 'all 2s ease'
}

export {
  fColumnNoWrap,
  fColumnNoWrapCenter,
  fInlineNoWrap,
  fInlineAround,
  fInlineCenter,
  fInlineNoWrapCentered,
  transitionFast,
  transitionSlow,
  transitionVerySlow
}