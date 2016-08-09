import React, { PropTypes, Component } from 'react'
import autobind from 'autobind-decorator'
import SimpleLoading from '/imports/ui/SimpleLoading'
import SelectableList from '/imports/ui/SelectableList'
import { ListItem } from 'material-ui/List'
import FontIcon from 'material-ui/FontIcon'
import NotFound from '/imports/ui/NotFound'
import RaisedButton from 'material-ui/RaisedButton'
import { fColumnNoWrap } from '/imports/styles'
import Subheader from 'material-ui/Subheader'
import Caption from './Caption'

const style = {
  height: '100%',
  background: 'transparent',
  marginTop: 'auto',
  marginBottom: 'auto'
}

@autobind
class Sources extends Component {

  static displayName = 'Sources'

  static contextTypes = {
    t: PropTypes.func.isRequired
  }

  static propTypes = {
    experiment: PropTypes.object.isRequired,
    selectSource: PropTypes.func.isRequired,
    refreshSources: PropTypes.func.isRequired,
    places: PropTypes.array,
    source: PropTypes.string,
    placesError: PropTypes.string
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

  static renderPlaceRow (caption) {
    {/*return <ListItem value={caption.place} key={caption.place}>{caption.place}</ListItem>*/}
    return <Caption value={caption.place} key={caption.place} caption={caption} />
  }

  renderError () {
    const { placesError } = this.props
    console.info('PLACES ERROR', placesError)
    return <NotFound message={placesError} style={style}>{this.renderRefreshButton()}</NotFound>
  }

  renderSources () {
    const { places, source } = this.props
    const { t } = this.context
    const lines = places.map(Sources.renderPlaceRow)
    return (
      <SelectableList value={source} style={style} onChange={this.selectSource}>
        <Subheader>{t('experiment.caption-points')}</Subheader>
        {lines}
      </SelectableList>
    )
  }

  static renderLoading () {
    return <SimpleLoading style={style} />
  }

  render () {
    const { places, placesError } = this.props
    const loading = places == null && placesError == null
    let body = null
    if (loading) body = Sources.renderLoading()
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

export default Sources
