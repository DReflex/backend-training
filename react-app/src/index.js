import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import RouterApp from './routerApp';
import './index.css';


ReactDOM.render(  <BrowserRouter><RouterApp/></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
