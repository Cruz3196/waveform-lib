import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import FormModal from "../formModel/FormModal";

class ProfileHeader extends React.Component {
    state = {
        modalOpen: false
    };
    
    handleModalToggle = () => {

        this.setState((prevState) => ({
            modalOpen: !prevState.modalOpen
        }));
    };

    render(){
        return(
            <>
                <Navbar bg="light" data-bs-theme="light">
                    <Container>
                        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link onClick={this.handleModalToggle}>Upload</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                <FormModal modalOpen={this.state.modalOpen} handleModalClose={this.handleModalToggle} />
            </>
        )
    }
}

export default ProfileHeader;