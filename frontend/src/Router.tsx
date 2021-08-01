// import React from 'react';
// import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Home} from './components/templates/index';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
