import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reducer from './Reducer/Reducer';

const appStore = createStore(Reducer, applyMiddleware(thunk));
export default appStore;
