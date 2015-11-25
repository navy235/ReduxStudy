import { createStore as _createStore, applyMiddleware } from 'redux';
import createMiddleware from '../middleware/clientMiddleware';
import transitionMiddleware from '../middleware/transitionMiddleware';
import reducers from '../reducers'

export default function createStore(reduxReactRouter, getRoutes, createHistory, client, data) {
    const middleware = [createMiddleware(client), transitionMiddleware];
    let finalCreateStore = applyMiddleware(...middleware)(_createStore);
    finalCreateStore = reduxReactRouter({ getRoutes, createHistory })(finalCreateStore);
    const store = finalCreateStore(reducers, data);
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            store.replaceReducer(require('../reducers'));
        });
    }
    return store;
}
