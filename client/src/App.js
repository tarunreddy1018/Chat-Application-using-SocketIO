import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

import './App.css';

const App = () => (
  <Router>
    <div className='routes'>
      <Route path="/" exact component={HomePage} />
      <Route path="/join" exact component={Join} />
      <Route path="/chat" exact component={Chat} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
    </div>
  </Router>
)

export default App;
