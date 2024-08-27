import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// 添加这行
window.process = { env: { NODE_ENV: process.env.NODE_ENV } };

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);