import { Link } from 'react-router'
import React, { PropTypes, Component } from 'react'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import SimpleLoading from '/imports/ui/SimpleLoading'
import FlatButton from 'material-ui/FlatButton'
import ExperimentState from '../../experiment/components/ExperimentState'
import { fColumnNoWrap } from '/imports/styles'
import RaisedButton from 'material-ui/RaisedButton'
import autobind from 'autobind-decorator'
import { lighten } from 'material-ui/utils/colorManipulator'
import StylizedLabeledIdentifier from '/imports/ui/StylizedLabeledIdentifier'

const AlignedSpan = ({ children }) => <span style={{ display: 'flex', alignItems: 'center' }}>{children}</span>

const flexInline = { display: 'flex', justifyContent: 'space-around', alignItems: 'center' }

const expStyle = {
  flexBasis: 250,
  width: 250,
  height: 150,
  margin: 10,
  ...fColumnNoWrap
}

@autobind
class ExperimentCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hovered: false
    }
  }

  handleMouseEnter () {
    this.setState({
      hovered: true
    })
  }

  handleMouseLeave () {
    this.setState({
      hovered: false
    })
  }

  render () {
    const { defaultBackground, hoverBackground, project, experiment } = this.props
    const { hovered } = this.state
    const { name, _id, date } = experiment
    const { nav, t, theme } = this.context
    const background = hovered ? hoverBackground : defaultBackground
    return (
      <Paper onClick={() => nav(`/e/${project.acronym}/${name}`)}
             rounded={false}
             key={_id}
             zDepth={0}
             onMouseEnter={this.handleMouseEnter}
             onMouseLeave={this.handleMouseLeave}
             style={{ background, cursor: 'pointer', ...expStyle }}>
        <div style={{ fontSize: 28 }}>
          <StylizedLabeledIdentifier label={t('experiment.experiment')} identifier={name} idFontSize={28} stripColor={theme.palette.primary2Color}/>
        </div>
        <div style={{ flexInline, flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          <AlignedSpan>
            <i className='mdi mdi-calendar' />&nbsp;{date}
          </AlignedSpan>
          <AlignedSpan>
            <i className='fa fa-hourglass' />&nbsp;{experiment.getReadableDuration()}
          </AlignedSpan>
        </div>
        <ExperimentState experiment={experiment} />
      </Paper>
    )
  }
}

ExperimentCard.contextTypes = {
  nav: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
}

ExperimentCard.propTypes = {
  defaultBackground: PropTypes.string.isRequired,
  hoverBackground: PropTypes.string.isRequired,
  project: PropTypes.object.isRequired,
  experiment: PropTypes.object.isRequired
}

const ExperimentsList = ({ experiments, loading, cardBackground, project }, { t }) => {
  if (!loading) {
    let experimentsItems = experiments.map((experiment) => (
      <ExperimentCard key={experiment._id} project={project} defaultBackground={cardBackground} hoverBackground={lighten(cardBackground, 0.1)} experiment={experiment} />
    ))
    if (experimentsItems.length === 0) experimentsItems = <div>{t('dashboard.noexps')}</div>
    return (
      <div style={{ display: 'flex', flexFlow: 'row wrap', margin: 'auto', justifyContent: 'center' }}>
        {experimentsItems}
      </div>
    )
  } else return <SimpleLoading />

}

ExperimentsList.propTypes = {
  experiments: PropTypes.array,
  filter: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  project: PropTypes.object.isRequired,
  cardBackground: PropTypes.string.isRequired
}

ExperimentsList.contextTypes = {
  t: PropTypes.func.isRequired
}

export default ExperimentsList