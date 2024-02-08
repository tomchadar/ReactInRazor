/* eslint-disable */
import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
//import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom';
//import '../cssheets/bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap.css';
//import '../cssheets/NavMenu.css';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);
        
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            listOnly:false
        };
        if (props && props.listOnly) {
            this.state.listOnly = true;
        }
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    async onLinkClicked(props) {
        var scope = props.scope;
        console.log('NavMenu: onLinkClicked',props)
    }

    renderMenuItemList(props) {
        var _this = this;
        if (!_this) {
            _this = props.scope;
        }
        return (
            <ul className="navbar-nav flex-grow">
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/home">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                </NavItem>

            </ul>
        );

    }
    render() {
        var _this = this;
        if (_this.state.listOnly === true) {
            return (
                <_this.renderMenuItemList {..._this.props} scope={_this} />
            );
        }
        return (
            <header data-html-location={'components-NavMenu'} className={'container-fluid'}>
                {/*{'<!-- components-NavMenu.js -->'}*/}
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <_this.renderMenuItemList {..._this.props} scope={_this} />
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
