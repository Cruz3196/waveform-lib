import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, Nav, Navbar, NavDropdown, Dropdown } from 'react-bootstrap';
import rivianlogo3 from "../../../assets/images/rivianlogo3.png";
// import FormModal from '../formModel/FormModal';
import HeaderStyles from './HeaderStyles';
import { auth } from '../../../features/firebase.config';

class Header extends React.Component {
  // state = {
  //   modalOpen: false
  // };

  // handleModalToggle = () => {
  //   this.setState((prevState) => ({
  //     modalOpen: !prevState.modalOpen
  //   }));
  // };

  handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User Logged Out");
    } catch (error) {
      console.error("Error Logging Out:", error.message);
    }
  };

  render() {
    const { user } = this.props; 
    return (
      <>
        <Navbar expand="md" bg="dark" data-bs-theme="dark" style={HeaderStyles.HeaderContainer}>
          <Container>
            <Navbar.Brand href="/">
              <img src={rivianlogo3} width="290" height="90" alt="Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                <Nav.Link as={Link} to="/">Library</Nav.Link>
                {/* <Nav.Link onClick={this.handleModalToggle}>Upload</Nav.Link> */}

                <NavDropdown title="Profile">
                  {user ? (
                    <>
                      <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                      <Dropdown.Item onClick={this.handleLogout}>Logout</Dropdown.Item>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
                      <Dropdown.Item as={Link} to="/register">Register</Dropdown.Item>
                    </>
                  )}
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Modal Component
        <FormModal modalOpen={this.state.modalOpen} handleModalClose={this.handleModalToggle} /> */}
      </>
    );
  }
}

export default Header;
