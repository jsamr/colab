
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

export {
  fColumnNoWrap,
  fColumnNoWrapCenter,
  fInlineNoWrap,
  fInlineAround,
  fInlineCenter,
  fInlineNoWrapCentered
}