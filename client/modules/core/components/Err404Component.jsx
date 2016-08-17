import React, { PropTypes } from 'react'
import NotFound from '/imports/ui/NotFound'

const Err404Component = (props, { t }) => <NotFound message={t('not-found')} />

Err404Component.contextTypes = {
  t: PropTypes.func.isRequired
}

export default Err404Component
