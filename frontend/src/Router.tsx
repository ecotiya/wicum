import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {Home, SignUp, SignIn} from './components/templates/index';
import {Auth} from './components/module/index';
import {ReactRoutesPath} from './constants/commonConstants';

const Router = () => {
  return (
    <Switch>
      // Switch && Route exact path … pathが完全一致したときにコンポーネントを呼び出す。
      // pathの値は動的に変更可能。/posts/:id
      <Auth>
        {/* ログイン前 */}
        <Route exact path={ReactRoutesPath.SIGN_IN} component={SignIn} />
        <Route exact path={ReactRoutesPath.SIGN_UP} component={SignUp} />

        {/* ログイン後 */}
        <Route exact path={ReactRoutesPath.HOME} component={Home} />
      </Auth>
    </Switch>
  );
};

export default Router;
