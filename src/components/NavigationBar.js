import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'
import { AuthContext } from '../contexts/AuthContext'

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

  const authContext = useContext(AuthContext)

  return (
    <Styles>
      <Navbar expand="lg">
        <Navbar.Brand href="/">Georgia Tech Library {authContext.ssn}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">

            {authContext.token !== null ?
              <>
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/">Catalog</Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/register">Register members</Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/loan">Loans</Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <Link onClick={()=>{authContext.logout()}}>Logout</Link>
                  </Nav.Link>
                </Nav.Item>
              </> :
              <Nav.Item>
                <Nav.Link>
                  <Link to="/">Login</Link>
                </Nav.Link>
              </Nav.Item>}

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles >
  )

}