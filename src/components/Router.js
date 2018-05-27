import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App.js'
import SendEmail from './SendEmail';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/your-gift/:item1/:item2/:item3" component={SendEmail} />
    </Switch>
  </BrowserRouter>
)

export default Router;
