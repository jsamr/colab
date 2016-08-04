import React, { PropTypes, Component } from 'react'
import autobind from 'autobind-decorator'

@autobind
class Sources extends Component {

  handleSession (experiment) {
    const session = experiment.createSession()
    console.info('SESSION CREATED', session)
    session.requirePlaces().then(
      (answer) => console.info('SESSION RESOLVED', answer),
      (error) => console.info('SESSION ERROR', error)
    )
  }

  componentDidMount () {
    this.handleSession(this.props.experiment)
  }

  componentWillReceiveProps ({ experiment }) {
    if (experiment !== this.props.experiment || experiment._id !== this.props.experiment._id){
      this.handleSession(experiment)
    }
  }
  render () {
    return (
      <div>
        SOURCES TAB
      </div>
    )
  }
}

Sources.propTypes = {
  experiment: PropTypes.object.isRequired
}

export default Sources
