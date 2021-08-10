
import React from "react";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";



function App() {
  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
          PersoNote - Home
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            <LinkContainer to="/signup">
              <Nav.Link>Sign Up</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link href>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    <Routes />
    </div>
  );
}

export default App;
