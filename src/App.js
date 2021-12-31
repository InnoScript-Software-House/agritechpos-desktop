/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, HashRouter, Switch } from 'react-router-dom';
import { Router } from 'react-router-dom/cjs/react-router-dom.min';
import LoginPage from './pages/auth/Login';
import DashboardPage from './pages/Dashboard';
import InventroyPage from './pages/Inventroy';
import LandingPage from './pages/Landing';
import RegisterPage from './pages/Register';

export default class App extends Component {

  render() {
    return(
      <HashRouter>
        <Route exact path={'/'} component={LandingPage} />
        <Route exact path={'/login'} component={LoginPage} />
        <Route exact path={'/register'} component={RegisterPage} />
        <Route exact path={'/dashboard'} component={DashboardPage} />
        <Route exact path={'/inventory'} component={InventroyPage} />
      </HashRouter>
    );
  }
}
