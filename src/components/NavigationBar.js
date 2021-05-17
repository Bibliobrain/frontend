import React from 'react'
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'


const Styles = styled.div`
    .navbar{
        background-color:rgb(14,51,62);
        height: 80px;
    }
    .navbar-brand{
        color: rgb(255,255,255)
    }
    
    .navbar-nav .nav-link {
        color: rgb(255,255,255)
    }
`;

export const NavigationBar = () => {
    return(
        <Styles>
        <Navbar expand="lg">
          <Navbar.Brand href="/">Georgia Tech Library</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Item>
                <Nav.Link>
                  <Link to="/">Login</Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <Link to="/catalog">Catalog</Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <Link to="/register">Register members</Link>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Styles >
    )
   
}