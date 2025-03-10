import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import LoginStyles from "./LoginStyles"; 

const Login = () => {

    return (
        <Container style={LoginStyles.Container}>
            <div style={LoginStyles.FormWrapper}> 
                <h2 style={LoginStyles.Title}>Login</h2> 
                <Form>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            style={LoginStyles.Input} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            style={LoginStyles.Input}  
                        />
                    </Form.Group>

                    <Button 
                        variant="primary" 
                        type="submit" 
                        style={LoginStyles.Button} 
                    >
                        Login
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default Login;
