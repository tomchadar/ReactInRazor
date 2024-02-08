import React, { Component } from 'react';
//TomC react 18
//import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
//end TomC react 18
import { Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

import './custom.css';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Routes>
                    <Route exact path='/' component={Home} />
                    <Route path='/counter' component={Counter} />
                    <Route path='/fetch-data' component={FetchData} />
                </Routes>
            </Layout>
        );
    }
}
