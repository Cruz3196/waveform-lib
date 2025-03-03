import React from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import Rivianlogo2 from "../../../assets/images/Rivianlogo2.png";
import FormModal from '../formModel/FormModal';

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
        <Navbar expand="md" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#">
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
                <Nav.Link href="#action1">Library</Nav.Link>
                <Nav.Link href="#action2" onClick={this.handleModalToggle}>
                  Upload
                </Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
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
