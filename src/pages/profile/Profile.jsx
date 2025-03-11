import React from 'react';
import { Form, Button, Container} from 'react-bootstrap';
import "./ProfileStyles";
import ProfileStyles from './ProfileStyles';


const profile = () => {
  return (
    <Container style={ProfileStyles.Container}>
      <div style={ProfileStyles.FormWrapper}>
        <h2 style={ProfileStyles.Title}>Profile</h2>
        <Form>

          <Form.Group className="mb-3">
            <Form.Control 
              style={ProfileStyles.Input} 
              type="text" 
              placeholder="Name" 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control 
              style={ProfileStyles.Input} 
              type="text" 
              placeholder="Username"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control 
              style={ProfileStyles.Input} 
              type="email" 
              placeholder="E-Mail"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control 
              style={ProfileStyles.Input} 
              type="password" 
              placeholder="Password" 
            />
          </Form.Group>

          <Button style={ProfileStyles.Button} type="submit">
            Save
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default profile;