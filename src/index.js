import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routing from './Routing';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import { SelectedParkProvider } from './SelectedParkContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

   <SelectedParkProvider>

      <Router>  
        
          <AuthProvider>

            <Routing />

          </AuthProvider>

        </Router>

   </SelectedParkProvider>

  </React.StrictMode>

);

