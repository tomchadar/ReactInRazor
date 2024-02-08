import './environment.js';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js/features/string/repeat';
import 'core-js/features/array/find';
import 'core-js/features/array/includes';
import 'core-js/features/array/index-of';
import 'core-js/features/array/is-array';
import 'core-js/features/number/is-nan';
// eslint-disable-next-line
import { ResizeObserver } from '@juggle/resize-observer';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line
//import './localization/';
//220408
// eslint-disable-next-line
import './log/consolelog'
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './core/ErrorBoundary';
import TopApp from './TopApp';



//import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <ErrorBoundary>
            <TopApp />
        </ErrorBoundary>
  </BrowserRouter>,
  rootElement);

//registerServiceWorker();

