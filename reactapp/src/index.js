import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter } from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// pacchetto per il DOM (html), renderizza la nostra App
ReactDOM.render(

  <React.StrictMode>
       <BrowserRouter>
    <App />
 </BrowserRouter>
  </React.StrictMode>
,
  document.getElementById('root') //serve per il collegamento con App, infatti sulla pagina index.html su div root lo ficco la la nostra App
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
