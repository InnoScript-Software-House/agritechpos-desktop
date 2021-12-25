import React, { Component } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import LoginPage from './pages/auth/Login';

export default class App extends Component {

  componentDidMount() {
    window.nativeApi.notification.sendNoti('sys-start-notify');
  }

  render() {
    return(
      <HashRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </HashRouter>
    );
  }
}
