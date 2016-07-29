import React from 'react'
import { fInlineNoWrapCentered } from '/imports/styles'

const Header = (props) => <h1 {...props} style={{ margin: 0, ...fInlineNoWrapCentered, ...props.style }} />
const HeadBar = (props) => (
  <div style={{ ...props.style, ...fInlineNoWrapCentered }}>
    <Header style={{ flexGrow: 1 }}>
      {props.children}
    </Header>
    <div>
      {props.actions}
    </div>
  </div>
)

export default HeadBar