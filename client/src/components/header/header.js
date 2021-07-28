import React from 'react';
import {Navbar,Nav,NavDropdown} from "react-bootstrap";
import { Link } from 'react-router-dom';
const Header=()=>{
    return(
        <Navbar className="border-bottom border-dark m-4 mb-5 my-0" bg="transparent" variant="dark" expand="">
  <Link className="navbar-brand" to="/home"><span className="text-muted ">STR</span>ANGY</Link>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link as={Link} to="/home">Home</Nav.Link>
      <Nav.Link as={Link} to="/about">About</Nav.Link>
    </Nav>
    
  </Navbar.Collapse>
</Navbar>
    )
}
export default Header;