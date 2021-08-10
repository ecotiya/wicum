import { createStore as reduxCreateStore, combineReducers, compose, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { UsersReducer } from "../users/index";
import thunk from 'redux-thunk';

// history…ブラウザで現在どのURLにいるか保持している値。
export default function createStore(history:any) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer,
    }),
    applyMiddleware(
      routerMiddleware(history), thunk
    )
  )
}
