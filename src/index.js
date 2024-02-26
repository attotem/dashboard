import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routing from './Routing';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
        <AuthProvider>
          <Routing />
        </AuthProvider>
      </Router>
  </React.StrictMode>

);

