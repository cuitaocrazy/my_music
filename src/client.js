/**
 * Created by cuitao on 2016/12/27.
 */

import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import sagaMiddlewareFactory from 'redux-saga'
import React from 'react'
import DevTools from './containers/DevTools'
import reducers from './reducers'
import mySaga from './saga/loginSaga'

const saga = sagaMiddlewareFactory()
const container = document.getElementById("container")
const store = createStore(reducers, DevTools.instrument(), applyMiddleware(saga))
saga.run(mySaga)

function render() {
    const App = require('./containers/App')
    ReactDOM.render(
        <Provider store={store}>
            <div>
                <App />
                <DevTools />
            </div>
        </Provider>,
        container
    )
}

render()

if (module.hot) {
    module.hot.accept("./containers/App", () => render())
}