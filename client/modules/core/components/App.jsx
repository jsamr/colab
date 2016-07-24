import TopBar from '../containers/TopBar'
import MainWrapper from './MainWrapper'
import React, { Component, PropTypes } from 'react'
const TOPBAR_HEIGHT = 60

class App extends Component {

  render () {
    return (
      <div>
        <TopBar height={TOPBAR_HEIGHT} />
        <MainWrapper
          style={{ minHeight: this.props.wHeight - TOPBAR_HEIGHT,
            position: 'relative',
            top: TOPBAR_HEIGHT, display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
            }}>
          {this.props.children}
        </MainWrapper>
      </div>
    )
  }
}

App.propTypes = {
  wHeight: PropTypes.number
}

export default App