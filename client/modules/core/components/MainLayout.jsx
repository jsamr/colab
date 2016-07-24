import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
// import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { setWinHeight, setWinWidth } from '../actions/index'
import debounce from 'lodash/debounce'
import { WIN_UPDATE_PERIOD } from '/client/configs/params'

class MainLayout extends Component {
  constructor (props) {
    super(props)
    this.handleResize = debounce(() => {
      const height = window.innerHeight
      const width = window.innerWidth
      this.props.store.dispatch(setWinHeight(height))
      this.props.store.dispatch(setWinWidth(width))
    }, WIN_UPDATE_PERIOD)
  }

  componentWillMount () {
    this.handleResize()
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  getChildContext () {
    return {
      muiTheme: getMuiTheme(this.props.theme),
      t: this.props.t,
      VERSION: this.props.VERSION,
      theme: this.props.theme
    }
  }

  render () {
    return (
      <Provider store={this.props.store}>
        {this.props.children}
      </Provider>
    )
  }
}

MainLayout.propTypes = {
  t: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  VERSION: PropTypes.string,
  theme: PropTypes.object.isRequired
}

MainLayout.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  VERSION: PropTypes.string,
  theme: PropTypes.object.isRequired
}

export default MainLayout
