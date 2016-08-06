import React, { PropTypes, Component } from 'react'
import autobind from 'autobind-decorator'
import SimpleLoading from '/imports/ui/SimpleLoading'
import { ListItem } from 'material-ui/List'
import SelectableList from '/imports/ui/SelectableList'
import FontIcon from 'material-ui/FontIcon'
import NotFound from '/imports/ui/NotFound'
import RaisedButton from 'material-ui/RaisedButton'
import { fColumnNoWrap } from '/imports/styles'

const style = {
  height: '100%',
  background: 'transparent',
  marginTop: 'auto',
  marginBottom: 'auto'
}

@autobind
class Sources extends Component {

  constructor (props) {
    super(props)
  }

  selectSource (source) {
    const { selectSource } = this.props
    selectSource(source)
  }

  handleRefreshSources () {
    const { refreshSources } = this.props
    refreshSources()
  }

  renderRefreshButton () {
    const { t } = this.context
    return (
      <RaisedButton icon={<FontIcon className='mdi mdi-refresh' />}
                    primary={true}
                    label={t('actions.refresh')}
                    onClick={this.handleRefreshSources}
                    style={{ marginTop: 7 }}
      />
    )
  }

  renderError () {
    const { placesError } = this.props
    return <NotFound message={placesError} style={style}>{this.renderRefreshButton()}</NotFound>
  }

  renderSources () {
    const { places, source } = this.props
    const lines = places.map(({ place }) => {
      return (<ListItem value={place} key={place} leftIcon={<FontIcon className='mdi mdi-video'/>} primaryText={place} />)
    })
    return (
      <SelectableList value={source} style={style} onChange={this.selectSource}>
        {lines}
      </SelectableList>
    )
  }

  renderLoading() {
    return <SimpleLoading style={style} />
  }

  render () {
    const { places, placesError } = this.props
    const loading = places == null && placesError == null
    let body = null
    if (loading) body = this.renderLoading()
    else if (placesError) body = this.renderError()
    else body = this.renderSources()
    return (
      <div style={{ ...fColumnNoWrap, justifyContent: 'space-between', flexGrow: 1 }}>
        {this.renderRefreshButton()}
        {body}
      </div>
    )
  }
}

Sources.propTypes = {
  experiment: PropTypes.object.isRequired,
  selectSource: PropTypes.func.isRequired,
  refreshSources: PropTypes.func.isRequired,
  places: PropTypes.array,
  source: PropTypes.string
}

Sources.contextTypes = {
  t: PropTypes.func.isRequired
}

export default Sources
