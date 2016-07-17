import * as actions from './actions'
import mediaNodeReducer from './reducer'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { authenticateWithCredentials } from './auth-saga'
import rootSaga from './saga'
import { expect } from 'meteor/practicalmeteor:chai'
import each from 'lodash/each'
import createSagaMiddleware from 'redux-saga'

describe('medianode', function () {
  describe('reducer', function () {
    let store
    function resetStore () {
      store.dispatch({ type: actions.RESET })
    }
    before(function () {
      store = createStore(mediaNodeReducer)
    })
    afterEach(resetStore)
    it('should acknowledge a dispatch event', function () {
      store.dispatch({ type: actions.AUTH_OK })
      expect(store.getState()).to.have.property('valid').true
    })
    each(actions, function (action) {
      const name = action.toString()
      describe('dispatching action ' + name, function () {
        it('should be a symbol', function () {
          expect(action).to.be.a.symbol
        })
        after(resetStore)
        it(' should not mutate the old state', function () {
          const oldState = store.getState()
          store.dispatch({ type: action })
          expect(store.getState()).not.to.equal(oldState)
        })
      })
    })
  })
  describe('auth saga', function () {
    let store
    const sagaMiddleWare = createSagaMiddleware()
    before(function () {
      store = createStore(combineReducers({
        media: mediaNodeReducer
      }), applyMiddleware(sagaMiddleWare))
      sagaMiddleWare.run(rootSaga)
      // store.dispatch( { type: actions.SWITCH_ON } )
      store.dispatch({ type: actions.AUTH })
      console.info('called before')
    })
    describe('should run', function () {
      it('blah', function () {
        expect(true).to.be.true
      })
    })
  })
})
