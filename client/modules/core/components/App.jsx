import TopBar from './TopBar'
import MainWrapper from './MainWrapper'
import React, { Component, PropTypes } from 'react'

class App extends Component {

  getChildContext () {
    return {
      user: this.props.user
    }
  }

  render () {
    return (
      <div>
        <TopBar height={60} />
        <MainWrapper>
          {this.props.children}
        </MainWrapper>
      </div>
    )
  }
}

App.childContextTypes = {
  user: PropTypes.object
}

export default App