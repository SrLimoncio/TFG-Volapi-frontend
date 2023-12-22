import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Importa BrowserRouter


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import './index.css'
import App from './App';


/*const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);*/

const root = createRoot(document.getElementById('root'));

if (process.env.REACT_APP_NODE_ENV === 'production') {
  root.render(
    <Router>
      <App />
    </Router>
    );
} else {
  root.render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  );
}