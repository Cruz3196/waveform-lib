import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import LoginStyles from "./LoginStyles"; 

const Login = () => {
    return (
        <Container style={LoginStyles.Container}>
            <div style={LoginStyles.FormWrapper}> 
                <h2 style={LoginStyles.Title}>Login</h2> 
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            style={LoginStyles.Input} 
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            style={LoginStyles.Input}  
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" style={LoginStyles.Checkbox} />
                    </Form.Group>
                    <Button 
                        variant="primary" 
                        type="submit" 
                        style={LoginStyles.Button} 
                    >
                        Submit
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default Login;
