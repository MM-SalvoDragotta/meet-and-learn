import React from 'react';
import { Link , Redirect } from 'react-router-dom';

import { Nav , Navbar , NavDropdown , Dropdown , Container , SplitButton} from "react-bootstrap";

import Auth from '../../utils/auth';

import Logo from '../../assets/logo.png';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();    
    Auth.logout();
    
  };

  return (
    <div> 
      <Navbar 
      variant="dark" bg="dark" expand="lg" 
      className=" mb-4 py-3 flex-row align-center" 
      > 
        <Container fluid className="container flex-row justify-space-between-lg justify-center align-center">
          <Navbar.Brand href="#home">
            <Link className="text-light" to="/">
                  {/* <h2 className="m-0">Meet and Learn</h2> */}
                  <img width="300px" height="auto" className="img-responsive" src={Logo}  alt="logo" />
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
          {Auth.loggedIn() ? (
            <>
              <Nav className="ml-auto">
              <SplitButton
                align={{ lg: 'end' }}
                title={`${Auth.getProfile().data.username}'s Account`}
                // id="dropdown-menu-align-responsive-2"
                className=" m-2" 
              >
                {/* <NavDropdown
                  id="nav-dropdown-dark-example"
                  title="Account"
                  menuVariant="dark" 
                  className="btn btn-lg btn-info m-2"         
                > */}
                  <NavDropdown.Item >
                    <Link to="/dashboard" variant="light">
                      Dashboard
                    </Link>
                    </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item >
                  <Link to="/addEvent" variant="light">
                      Create New Event
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  {/* <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item> */}
                {/* </NavDropdown> */}
                </SplitButton>                                
                  <button className="btn btn-lg btn-light m-2" onClick={logout}>
                  Logout
                  </button>                
              </Nav>
            </>
              ) : (
                <div className="ml-auto">
                
                  <Link className="btn btn-lg btn-info m-2" to="/login">
                    Login
                  </Link>
                
                  <Link className="btn btn-lg btn-light m-2" to="/signup">
                    Signup
                  </Link>
                </div>
              )}

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
