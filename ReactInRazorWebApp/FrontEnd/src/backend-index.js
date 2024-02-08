/* eslint-disable */
import './environment.js';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

//import './localization/';
//220408
import './log/consolelog';
//import videojs from 'video.js';
//import VideoJSBase from '../src/players/videojsbase/videojssrc.js';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';


import { JssProvider, SheetsRegistry } from 'react-jss';

import { renderStylesToString } from 'emotion-server';


global.React = React;
global.ReactDOM = ReactDOM;
global.ReactDOMServer = ReactDOMServer;

global.ReactJss = { JssProvider, SheetsRegistry };

global.EmotionServer = { renderStylesToString };

//global.Helmet = Helmet;
//global.launchFullApp = { launchFullApp };

global.FetchData = { FetchData };
global.Counter = { Counter };
global.Home = { Home };

global.AppComponents = {
    Home,
    Counter,
    FetchData
};
