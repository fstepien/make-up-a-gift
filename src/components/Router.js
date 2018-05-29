import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App.js'
import PersonalGift from './PersonalGift.js';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/your-gift/:product1-:item1/:product2-:item2/:product3-:item3" component={PersonalGift} />
    </Switch>
  </BrowserRouter>
)

export default Router;
