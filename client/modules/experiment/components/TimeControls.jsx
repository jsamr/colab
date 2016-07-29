import React, { PropTypes } from 'react'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import { fInlineAround, fInlineNoWrap, fColumnNoWrapCenter } from '/imports/styles'
import Paper from 'material-ui/Paper'
import ToggleAnnotations from '/imports/ui/controls/ToggleAnnotations'
import ToggleTasks from '/imports/ui/controls/ToggleTasks'
import FloatingActionButton from 'material-ui/FloatingActionButton'

const ControlLine = ({ children }) => <div style={{ ...fInlineAround, margin: '0 10px', flexGrow: 1 }}>{children}</div>

const Button = ({ children, ...props }) => <FloatingActionButton secondary={true} mini={true} {...props} >{children}</FloatingActionButton>

const TimeControls = ({ controls }) => {
  let { zoom } = controls
  return (
    <div style={{ ...fInlineNoWrap, flexBasis: 350 }}>
      <ControlLine>
        <Button>
          <ToggleAnnotations visible={true} />
        </Button>
        <Button>
          <ToggleTasks visible={true} />
        </Button>
      </ControlLine>
      <ControlLine>
        <Button disabled={zoom <= 1}>
          <FontIcon className='fa fa-search-minus'/>
        </Button>
        <div style={fColumnNoWrapCenter}>
          <div>Zoom</div>
          <div>X {zoom}</div>
        </div>
        <Button>
          <FontIcon className='fa fa-search-plus'/>
        </Button>
      </ControlLine>
    </div>
  )
}

TimeControls.propTypes = {
  controls: PropTypes.object.isRequired
}

export default TimeControls
