import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import {BiSmile} from 'react-icons/bi'




const Navigation = () => {
  return (
    <Container>
      <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" className="navbar">
        <Navbar.Brand href="/" className="navbar-logo">
          <BiSmile className="navbar-icon"/> Home
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link className= "link" href="/rankings">Rankings</Nav.Link>
            <Nav.Link className= "link" href="/search">Search</Nav.Link>
            <Nav.Link className= "link" href="/register">Register</Nav.Link>
            <Nav.Link className= "link" href="/Login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};


export default Navigation;
