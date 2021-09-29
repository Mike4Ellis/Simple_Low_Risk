import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import axios from 'axios';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// axios全局设置 设置baseURL为后端所在接口
// 开发环境读取.development 生产环境读取.production
axios.defaults.baseURL = process.env["REACT_APP_URL"];
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
