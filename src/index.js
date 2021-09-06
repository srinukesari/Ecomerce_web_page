import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as AWS from 'aws-sdk';


AWS.config.update({
  region: 'us-east-2',
  secretAccessKey:'H4ZMQj5s5uqda+D2ZmruKZYpoXb8w6g1YbBAijst', //'1HSZ4B8cIueFXW1Zn7zK/vbSv1lcxm8ED7gKjTSl',
  accessKeyId: 'AKIAUN7TPEEHPMRNU7LG'
  //'AKIAUN7TPEEHKAUH2F2E'
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
