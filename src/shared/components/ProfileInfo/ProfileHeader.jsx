import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
// import FormModal from "../formModel/FormModal";
import ProfileHeaderStyles from "./ProfileHeaderStyles";

class ProfileHeader extends React.Component {
    // state = {
    //     modalOpen: false
    // };
    
    // handleModalToggle = () => {

    //     this.setState((prevState) => ({
    //         modalOpen: !prevState.modalOpen
    //     }));
    // };

    render(){
        return(
            <>
                <Navbar bg="light" data-bs-theme="light" style={ProfileHeaderStyles.ProfileContainer}>
                    <Container>
                        <Nav className="me-auto">
                            <Nav.Link 
                                as={Link} to="/profile">
                                    Profile
                            </Nav.Link>
                            <Nav.Link as={Link} to="/profileLibrary">
                                {/* // onClick={this.handleModalToggle} */}
                                    My WaveForms
                            </Nav.Link>
                            <NavDropdown title="Comments" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
                                My Comments
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Comment for My Defects
                            </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Container>
                </Navbar>
                {/* <FormModal modalOpen={this.state.modalOpen} handleModalClose={this.handleModalToggle} /> */}
            </>
        )
    }
}

export default ProfileHeader;