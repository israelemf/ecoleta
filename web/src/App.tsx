import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import MainRoutes from './routes';

function App() {
  return (
    <Router>
      <MainRoutes />
    </Router>
  );
}

export default App;
