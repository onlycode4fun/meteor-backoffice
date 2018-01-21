

import React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import style from 'bootstrap/dist/css/bootstrap.css';

export default class NavbarMenu extends React.Component {

    constructor(props) {
        super(props);

    }


    buildMenuOptions(){
        let res = [];
        let collections = _.keys(Meteor.connection._mongo_livedata_collections);
        for(let i = 0; i < collections.length; i++){
            res.push(<MenuItem href={`/admin/${collections[i].toLowerCase()}`} eventKey={3.1}>{collections[i]}</MenuItem>)
        }
        return res;
    }

    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Dashboard</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown eventKey={3} title="Collections" id="basic-nav-dropdown">
                            {this.buildMenuOptions()}
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavDropdown eventKey={3} title="Account" id="basic-nav-dropdown">
                            <MenuItem href="/" onSelect={(e)=>{Meteor.logout(); FlowRouter.go("/login")}}> Logout </MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}