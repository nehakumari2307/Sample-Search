import { combineReducers } from 'redux';
import RoleListReducer from 'Routes/RoleDef/Redux/RoleListReducer';
import { ROLE_SEARCH } from './index';

const reducers = {};
reducers[ROLE_SEARCH] = RoleListReducer;
const appReducer = combineReducers(reducers);

export default appReducer;
