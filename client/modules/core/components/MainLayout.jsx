import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { useDeps } from 'mantra-core'
import { setWinHeight, setWinWidth } from '../actions/index'
import debounce from 'lodash/debounce'
import { WIN_UPDATE_PERIOD } from '/client/configs/params'

class MainLayoutImpl extends Component {
  constructor (props) {
    super(props)
    this.handleResize = debounce(() => {
      this.props.store.dispatch(setWinHeight(window.innerHeight))
      this.props.store.dispatch(setWinWidth(window.innerWidth))
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

  render () {
    return (
      <Provider store={this.props.store}>
        {this.props.children}
      </Provider>
    )
  }
}

const depsToPropsMapper = (context, actions) => ({
  store: context.Store
})

const MainLayout = useDeps(depsToPropsMapper)(MainLayoutImpl)

export {
  MainLayout
}
