import React, { Component } from 'react'
import autobind from 'autobind-decorator'

@autobind
class Hoverable extends Component {

  constructor (props) {
    super(props)
    this.state = {
      hovered: false,
      ...this.state
    }
  }

  onMouseEnter () {
    this.setState({
      hovered: true
    })
  }

  onMouseLeave () {
    this.setState({
      hovered: false
    })
  }
}

export default Hoverable
