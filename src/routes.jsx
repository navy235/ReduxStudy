import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Home,
    Login
} from 'containers';

export default (store) => {
    const requireLogin = (nextState, replaceState, cb) => {
        function checkAuth() {
            const { auth: { user }} = store.getState();
            if (!user) {
                // oops, not logged in, so can't be here!
                replaceState(null, '/');
            }
            cb();
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
