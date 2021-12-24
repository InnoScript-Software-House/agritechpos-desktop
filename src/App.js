import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import Login from './pages/auth/Login';

export default class App extends Component {

  render() {
    return(
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </HashRouter>
    );
  }
}
