import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => (
  <Router>
    <div className='routes'>
      <Route path="/" exact component={Join} />
      <Route path="/chat" exact component={Chat} />
    </div>
  </Router>
)

export default App;