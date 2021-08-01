import { createStore as reduxCreateStore, combineReducers, compose, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { UsersReducer } from "../users/index";
import thunk from 'redux-thunk';

const storeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function createStore(history:any) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer,
    }),
    storeEnhancers(applyMiddleware(
      routerMiddleware(history), thunk)
    )
  )
}
