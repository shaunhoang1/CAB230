import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Logout } from "../pages/Logout";
import {BiSmile} from 'react-icons/bi'


const Navigation2 = () => {
  return (
    <Container>
      <Navbar className="navbar" collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/" className="navbar-logo">
          <BiSmile className="navbar-icon"/> Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link className= "link" href="/rankings">Rankings</Nav.Link>
            <Nav.Link className= "link" href="/search">Search</Nav.Link>
            <Nav.Link className= "link" href="/factors">Factors</Nav.Link>
            <Nav.Link className= "link" href="/" onClick={Logout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};


export default Navigation2;
