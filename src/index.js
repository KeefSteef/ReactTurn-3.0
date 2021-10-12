import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import App from './App';
import rootReducer from "./redux/rootReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import defaultLogger from "redux-logger/src";
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(defaultLogger)));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

