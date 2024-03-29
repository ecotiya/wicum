import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import createStore from './re-ducks/store/store';
import { ConnectedRouter } from 'connected-react-router';
import * as History from 'history';
const history = History.createBrowserHistory();

export const store = createStore(history);

import reportWebVitals from './reportWebVitals';

// Provider…アプリケーション全体でstoreの情報を参照できるようにする。
// ConnectedRouter…Appコンポーネントで発生したURL変更履歴を管理する。
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
