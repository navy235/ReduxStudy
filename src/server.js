import express from 'express'
import session from 'express-session'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import serialize from 'serialize-javascript'
import cors from 'cors'
import React from 'react'
import ReactDOM from 'react-dom'
import { renderToString,renderToStaticMarkup } from 'react-dom/server'
import {ReduxRouter} from 'redux-router';
import {reduxReactRouter, match} from 'redux-router/server';
import createHistory from 'history/lib/createMemoryHistory';
import assets from './utils/assets'
import ApiClient from './utils/ApiClient';
import getStatusFromRoutes from './utils/getStatusFromRoutes';
import Html from './components/Html'
import createRoutes from './routes';
import createStore from './stores/createStore';
import apiService  from './services';
import config from './configs/server';

const server = express();

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'jade');
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(cookieParser());
server.use(cors());
server.use(favicon(__dirname + '/public/images/favicon.ico'));

server.use(config.virtualPath + '/static', express.static(path.join(__dirname, 'public')));
server.use(config.virtualPath + '/static', (req, res, next) => {
    res.render('error', {status: 404, stack: 'no such file'})
});

server.use(config.apiRoot + '/user', apiService.user)

server.use((req, res) => {
    const client = new ApiClient(req);
    const store = createStore(reduxReactRouter, createRoutes, createHistory, client);

    // Note that req.url here should be the full URL path from
    // the original request, including the query string.
    store.dispatch(match(req.originalUrl, (error, redirectLocation, routerState) => {
        if (redirectLocation) {
            res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
            res.render('error', {status: 500, stack: error.message})
        } else if (!routerState) {
            res.render('error', {status: 500, stack: error.message})
        } else {
            // Workaround redux-router query string issue:
            // https://github.com/rackt/redux-router/issues/106
            if (routerState.location.search && !routerState.location.query) {
                routerState.location.query = qs.parse(routerState.location.search);
            }

            store.getState().router.then(() => {
                const component = (
                    <Provider store={store} key="provider">
                        <ReduxRouter/>
                    </Provider>
                );
                const status = getStatusFromRoutes(routerState.routes);
                if (status) {
                    res.status(status);
                }
                res.send('<!doctype html>\n' +
                    renderToString(<Html assets={assets} component={component} store={store}/>));
            }).catch((err) => {
                res.render('error', {status: 500, stack: err.message})
            });
        }
    }));
})

module.exports = server;
