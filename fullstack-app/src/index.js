import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './app'

import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import allReducer from './reducers'

let globalState = createStore(allReducer, applyMiddleware(ReduxThunk))
globalState.subscribe(() => console.log("Global State : ", globalState.getState()))

ReactDOM.render(
    <Provider store={globalState}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)