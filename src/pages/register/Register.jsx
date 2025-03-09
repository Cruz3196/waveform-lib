import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import registerStyles from './RegisterStyles'; // Import styles

const Register = () => {
  return (
    <Container style={registerStyles.Container}>
      <div style={registerStyles.FormWrapper}>
        <h2 style={registerStyles.Title}>Sign Up</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control style={registerStyles.Input} type="text" placeholder="Name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control style={registerStyles.Input} type="text" placeholder="Login" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control style={registerStyles.Input} type="email" placeholder="E-Mail" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control style={registerStyles.Input} type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control style={registerStyles.Input} type="password" placeholder="Password Confirm" />
          </Form.Group>
          <Button style={registerStyles.Button} type="submit">
            Create new account
          </Button>
        </Form>
        <div style={registerStyles.SocialIcons}>
          <i className="fab fa-facebook" style={registerStyles.Icon}></i>
          <i className="fab fa-youtube" style={registerStyles.Icon}></i>
          <i className="fab fa-instagram" style={registerStyles.Icon}></i>
          <i className="fas fa-envelope" style={registerStyles.Icon}></i>
        </div>
      </div>
    </Container>
  );
};

export default Register;
