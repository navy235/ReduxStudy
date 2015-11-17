import 'babel-polyfill';
import React from 'react';
import ReactDOM from'react-dom';
import {Router} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {reduxReactRouter, ReduxRouter} from 'redux-router';
import createRoutes from './routes'
import createStore from './stores/createStore'
import ApiClient from './utils/ApiClient';
import makeRouteHooksSafe from './utils/makeRouteHooksSafe';

const store = createStore(reduxReactRouter, makeRouteHooksSafe(createRoutes), createHistory, client, window.__DATA__);

const component = (
    <ReduxRouter routes={createRoutes(store)} />
);

ReactDOM.render(
    <Provider store={store} key="provider">
        {component}
    </Provider>,
    document.getElementById('main')
);
