import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useUserAuth } from "../../features/context/UserAuthContext"; 
import { useNavigate } from "react-router-dom"; 
import LoginStyles from "./LoginStyles"; 

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const { logIn } = useUserAuth(); 
    let navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await logIn(email, password);
            navigate("/profile"); 
        } catch (err) {
            setError("Invalid email or password"); 
        }
    };

    return (
        <Container style={LoginStyles.Container}>
            <div style={LoginStyles.FormWrapper}> 
                <h2 style={LoginStyles.Title}>Login</h2> 
                <Form onSubmit={handleSubmit}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            style={LoginStyles.Input} 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            style={LoginStyles.Input}  
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
