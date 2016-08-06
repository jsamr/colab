import React, { PropTypes, Component } from 'react'
import { MakeSelectable, List } from 'material-ui/List'

let SelectableList = MakeSelectable(List)

function wrapState(ComposedComponent) {

  return class SelectableList extends Component {

    static propTypes = {
      children: PropTypes.node.isRequired,
      onChange: PropTypes.func,
      value: PropTypes.any
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
      console.info('INDEX IS : ', index)
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
