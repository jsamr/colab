import { REQUIRE_EXPERIMENT_PAGE, SELECT_TIME_MODE } from './actionsTypes'

const experiments = {
  requireExpPage ({ Store }, experiment) {
    Store.dispatch({
      type: REQUIRE_EXPERIMENT_PAGE,
      payload: experiment
    })
  },
  selectTimeMode ({ Store }, timeMode, experiment) {
    Store.dispatch({
      type: SELECT_TIME_MODE,
      payload: {
        timeMode,
        _id: experiment._id
      }
    })
  }
}

export {
  experiments
}
