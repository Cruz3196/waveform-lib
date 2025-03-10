import React  from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import registerStyles from './RegisterStyles'; 

const Register = () => {


  return (
    <Container style={registerStyles.Container}>
      <div style={registerStyles.FormWrapper}>
        <h2 style={registerStyles.Title}>Sign Up</h2>
        <Form>

          <Form.Group className="mb-3">
            <Form.Control 
              style={registerStyles.Input} 
              type="text" 
              placeholder="Name" 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control 
              style={registerStyles.Input} 
              type="text" 
              placeholder="Username"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control 
              style={registerStyles.Input} 
              type="email" 
              placeholder="E-Mail"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control 
              style={registerStyles.Input} 
              type="password" 
              placeholder="Password" 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control 
              style={registerStyles.Input} 
              type="password" 
              placeholder="Confirm Password"
            />
          </Form.Group>

          <Button style={registerStyles.Button} type="submit">
            Create new account
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Register;
