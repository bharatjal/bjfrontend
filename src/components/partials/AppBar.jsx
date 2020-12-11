import React, { Component } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

export default function AppBar() {
  return (
    <Navbar bg="light" expand="lg" fixed>
      <Navbar.Brand href="#home">Bharat Jal</Navbar.Brand>
      <Navbar.Toggle aria-controls="bahratjal-navbar" />
      <Navbar.Collapse id="bahratjal-navbar">
        <Nav className="ml-auto">
          <Nav.Link href="/dashboard">Home</Nav.Link>
          <Nav.Link className="btn btn-primary ml-2 mr-2 text-white" href="/">Login</Nav.Link>
          {/* <Button>Login</Button> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
