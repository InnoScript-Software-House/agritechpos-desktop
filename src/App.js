/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import React, { Component } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import LoginPage from './pages/auth/Login';
import DashboardPage from './pages/Dashboard';
import InventroyPage from './pages/Inventroy';
import LandingPage from './pages/Landing';
import RegisterPage from './pages/Register';
import SettingPage from './pages/Setting';
import UserViewPage from './pages/user/UserView';
import LicensePage from './pages/License';

class App extends Component {

  render() {

    return(
      <HashRouter>
        <Route exact path={'/'} component={LandingPage} />
        <Route exact path={'/license'} component={LicensePage} />
        <Route exact path={'/login'} component={LoginPage} />
        <Route exact path={'/register'} component={RegisterPage} />
        <Route exact path={'/dashboard'} component={DashboardPage} />
        <Route exact path={'/inventory'} component={InventroyPage} />
        <Route exact path={'/user'} component={UserViewPage} />
        <Route exact  path={'/setting'} component={SettingPage} />
      </HashRouter>
    );
  }
}

export default App;
