/* eslint-disable */
import React, { Component } from 'react';
//import { Route } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/LayoutSimple';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

//import './cssheets/custom.css';
import './custom.css';

export default class TopApp extends Component {
    static displayName = TopApp.name;
    constructor(props) {
        super(props);
    }
    static generateKey() {
        var key = 19760224;
        try {
            key = parseInt(Math.random().toString(16).slice(2), 16);
        } catch (err) {
            return 19760224;
        }
        return key;
    }

    render() {
        var thisScope = this;
        var keyBase = TopApp.generateKey();

        // eslint-disable-next-line
        var props = thisScope.props;

        return (
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/counter' element={<Counter />} />
                    <Route path='/fetch-data' element={<FetchData/>} />
                </Routes>
            </Layout>
        );
    }
    renderOOB() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetch-data' component={FetchData} />
            </Layout>
        );
    }
}
