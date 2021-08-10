import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {Home, SignUp, SignIn} from './components/templates/index';
import Auth from './Auth';

const Router = () => {
  return (
    <Switch>
      // Switch && Route exact path … pathが完全一致したときにコンポーネントを呼び出す。
      // pathの値は動的に変更可能。/posts/:id
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin"} component={SignIn} />

      <Auth>
        <Route exact path={"(/)?"} component={Home} />
      </Auth>
    </Switch>
  );
};

export default Router;
