import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Form, Nav, Navbar, NavDropdown, Dropdown } from 'react-bootstrap';
import Rivianlogo2 from "../../../assets/images/Rivianlogo2.png";
import FormModal from '../formModel/FormModal';
import HeaderStyles from './HeaderStyles';

class Header extends React.Component {
  state = {
    modalOpen: false
  };

  handleModalToggle = () => {
    this.setState((prevState) => ({
      modalOpen: !prevState.modalOpen
    }));
  };


  render() {
    return (
      <>
        <Navbar 
          expand="md" 
          bg="dark" data-bs-theme="dark"
          style={HeaderStyles.HeaderContainer}
        >
          <Container>
            <Navbar.Brand href="/">
              <img 
                src={Rivianlogo2} 
                width="290" 
                height="90" 
                alt="Logo" />
            </Navbar.Brand>
            <Navbar.Toggle 
              aria-controls="navbarScroll" 
            />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                <Nav.Link 
                  as={Link}
                  to="/"
                  href="#action1"
                  >
                    Library
                </Nav.Link>
                <Nav.Link 
                  href="#action2" 
                  onClick={this.handleModalToggle}>
                  Upload
                </Nav.Link>
                <NavDropdown
                  title="Profile"
                >
                  <Dropdown.Item 
                    eventKey="2"
                    >
                      <Nav.Link
                        as={Link}
                        to="/login"
                      >
                        Login
                      </Nav.Link>
                  </Dropdown.Item>
                  <Dropdown.Item 
                    eventKey="3"
                      >
                      <Nav.Link
                        as={Link}
                        to="/register"
                      >
                        Register
                      </Nav.Link>
                    </Dropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <Form.Control 
                  type="search" 
                  placeholder="Search" 
                  className="me-2" 
                  aria-label="Search" />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Modal Component */}
        <FormModal modalOpen={this.state.modalOpen} handleModalClose={this.handleModalToggle} />
      </>
    );
  }
}

export default Header;
