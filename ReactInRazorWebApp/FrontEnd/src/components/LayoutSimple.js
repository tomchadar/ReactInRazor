/* eslint-disable */
import React, { Component } from 'react';
//import { Container } from 'reactstrap';
import { NavMenu } from '../components/NavMenu';
//import '../cssheets/bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap.css';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        //220914
        debuglog(...dlog.orange('LayoutSimple.render', 'this.props.children', this.props.children));
        return (
            <>
                <NavMenu />
                <main id='appcontainer' className={'layoutsimple-js container-xxl w-100 h-100'} style={{ width: '100%' }}>
                    {this.props.children}
                </main>
            </>
        );

        return (
            <>
                <NavMenu />
                <main id='appcontainer' className={'layoutsimple-js container-fluid'}>
                    {this.props.children}
                </main>
            </>
        );

        return (
            <div>
                <NavMenu />
                <main id='appcontainer' className={'layoutsimple-js container'}>
                    {this.props.children}
                </main>
            </div>
        );

        return (
            <div>
                <NavMenu />
                <div id='appcontainer' className={'layoutsimple-js appcontainer container-no-pad'}>
                    {this.props.children}
                </div>
            </div>
        );
        return (
            <div>
                <NavMenu />
                <Container id='appcontainer'>
                    {this.props.children}
                </Container>
            </div>
        );

    }
}
