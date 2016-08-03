import React from 'react'
import { fInlineNoWrapCentered } from '/imports/styles'

const Header = (props) => <h1 {...props} style={{ margin: 0, ...fInlineNoWrapCentered, ...props.style }} />
const HeadBar = (props) => (
  <div style={{ ...props.style, ...fInlineNoWrapCentered, flexWrap: 'wrap' }}>
    <Header style={{ flexGrow: 1 }}>
      {props.children}
    </Header>
    <div style={{ ...fInlineNoWrapCentered, justifyContent: 'space-between', flexGrow: 1 }}>
      {props.actions}
    </div>
  </div>
)

export default HeadBar