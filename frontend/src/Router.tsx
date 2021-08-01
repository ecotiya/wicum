import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={Home} />
    </Switch>
  );
};

export default Router;
