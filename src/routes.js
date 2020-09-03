import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home/index';
import Header from './components/header';
import Footer from './components/footer';
import Article from './components/Articles/index';
import Teams from './components/Teams/index';

const Routes = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path='/articles/:id' component={Article} />
      <Route path='/teams' component={Teams} />
      <Route path='/' component={Home} />
    </Switch>
    <Footer />
  </BrowserRouter>
);
export default Routes;
