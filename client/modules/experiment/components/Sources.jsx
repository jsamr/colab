import React, { PropTypes, Component } from 'react'
import autobind from 'autobind-decorator'
import SimpleLoading from '/imports/ui/SimpleLoading'
import SelectableList from '/imports/ui/SelectableList'
import FontIcon from 'material-ui/FontIcon'
import NotFound from '/imports/ui/NotFound'
import RaisedButton from 'material-ui/RaisedButton'
import { fColumnNoWrap, transitionFast } from '/imports/styles'
import Subheader from 'material-ui/Subheader'
import Caption from './Caption'

const BASE_STYLE = {
  height: '100%',
  marginTop: 'auto',
  marginBottom: 'auto'
}

@autobind
class Sources extends Component {

  static displayName = 'Sources'

  static contextTypes = {
    t: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    muiTheme: PropTypes.object.isRequired
  }

  static propTypes = {
    selectSource: PropTypes.func.isRequired,
    refreshSources: PropTypes.func.isRequired,
    places: PropTypes.array,
    source: PropTypes.string,
    placesError: PropTypes.instanceOf(Error)
  }

  selectSource (source) {
    const { selectSource } = this.props
    selectSource(source)
  }

  handleRefreshSources (loading) {
    if (!loading) {
      const { refreshSources } = this.props
      refreshSources()
    }
  }

  renderRefreshButton (loading) {
    const { t, muiTheme } = this.context
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <RaisedButton icon={<FontIcon className='mdi mdi-refresh' />}
                      primary={true}
                      label={t('actions.refresh')}
                      onClick={() => this.handleRefreshSources(loading)}
                      style={{ marginBottom: muiTheme.experiment.padding }}
                      disabled={loading}
        />
      </div>
    )
  }

  static renderPlaceRow (caption) {
    return <Caption value={caption.place} key={caption.place} caption={caption} />
  }

  renderError () {
    const { placesError } = this.props
    return <NotFound message={placesError.message} style={BASE_STYLE}>{this.renderRefreshButton()}</NotFound>
  }

  renderSources () {
    const { places, source } = this.props
    const{ muiTheme, t } = this.context
    const lines = places.map(Sources.renderPlaceRow)
    return (
      <SelectableList value={source} style={{ background: muiTheme.experiment.sourcesListBackground, width: '100%', ...BASE_STYLE }}
                      onChange={this.selectSource} >
        <Subheader>{t('experiment.sources')} / {t('experiment.caption-points')}</Subheader>
        {lines}
      </SelectableList>
    )
  }

  static renderLoading () {
    return <SimpleLoading style={{ alignSelf: 'center', ...BASE_STYLE }} />
  }

  render () {
    const { places, placesError, style } = this.props
    const { muiTheme } = this.context
    const loading = places == null && placesError == null
    let body = null
    if (loading) body = Sources.renderLoading()
    else if (placesError) body = this.renderError()
    else body = this.renderSources()
    return (
      <div style={{ ...fColumnNoWrap, justifyContent: 'flex-start', flexGrow: 1, background: muiTheme.experiment.mediaBackground, ...BASE_STYLE, ...style }}>
        {this.renderRefreshButton(loading)}
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          {body}
        </div>
      </div>
    )
  }
}

export default Sources
