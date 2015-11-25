import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { load as loadAuth } from './actions/auth';
import {
    App,
    Home,
    Login,
    NotFound
} from './containers';

export default (store) => {
    const requireLogin = (nextState, replaceState, cb) => {
        function checkAuth() {
            const { auth: { user }} = store.getState();
            if (!user) {
                // oops, not logged in, so can't be here!
                replaceState(null, '/login');
            }
            cb();
        }

        function isAuthLoaded(state){
            return state.auth && state.auth.loaded;
        }

        if (!isAuthLoaded(store.getState())) {
            store.dispatch(loadAuth()).then(checkAuth);
        } else {
            checkAuth();
        }
    };

    /**
     * Please keep routes in alphabetical order
     */
    return (
        <Route path="/" component={App}>

            { /* Routes requiring login */ }
            <Route onEnter={requireLogin}>
                <IndexRoute component={Home}/>
            </Route>

            { /* Routes */ }
            <Route path="login" component={Login}/>

            { /* Catch all route */ }
            <Route path="*" component={NotFound} status={404} />
        </Route>
    );
};
