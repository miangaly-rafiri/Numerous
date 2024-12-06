import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './route';
import './index.css'; 

ReactDOM.render(
  <React.StrictMode>
    <Routes /> {/* Utilisation de Routes.js pour la navigation */}
  </React.StrictMode>,
  document.getElementById('root')
);
