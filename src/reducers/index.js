import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import auth from './auth';
import error from './error';
import {reducer as form} from 'redux-form';

export default combineReducers({
    router: routerStateReducer,
    auth,
    form,
    error
});
