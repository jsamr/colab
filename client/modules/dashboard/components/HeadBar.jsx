import React from 'react'

const Header = (props) => <h1 {...props} style={Object.assign(props.style || {}, { display: 'flex', alignItems: 'center', margin: 0 })} />

const HeadBar = (props) => (
  <div style={Object.assign(props.style || {}, { display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap' })}>
    <Header style={{ flexGrow: 1 }}>
      {props.children}
    </Header>
    <div>
      {props.actions}
    </div>
  </div>
)

export default HeadBar