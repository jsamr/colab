import React, { PropTypes, Component } from 'react'
import { MakeSelectable, List } from 'material-ui/List'

let SelectableList = MakeSelectable(List)

function wrapState (ComposedComponent) {

  return class extends Component {

    static displayName = 'SelectableList'

    static propTypes = {
      children: PropTypes.node.isRequired,
      onChange: PropTypes.func,
      value: PropTypes.any,
      defaultValue: PropTypes.any
    }

    componentWillMount () {
      this.setState({
        selectedIndex: this.props.defaultValue
      })
    }

    handleRequestChange = (event, index) => {
      const { onChange } = this.props
      this.setState({
        selectedIndex: index
      })
      if (onChange) onChange(index)
    }

    render () {
      const { value, onChange, children, ...props } = this.props
      return (
        <ComposedComponent
          value={value || this.state.selectedIndex}
          onChange={this.handleRequestChange}
          { ...props }
        >
          {children}
        </ComposedComponent>
      )
    }
  }
}

export default wrapState(SelectableList)
