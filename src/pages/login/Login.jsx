import React, {useState} from "react";
import { Form, Button, Container } from "react-bootstrap";
import LoginStyles from "./LoginStyles"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../features/firebase.config";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try{
            await signInWithEmailAndPassword(auth, email, password)
            console.log("Login Successfully");
            window.location.href ="/profile";
            toast.success("Login Successfully", {
                position: "top-right"
            });
        }catch(error){
            console.log(error.message)
            toast.error("Error Logging In", {
                position: "top-right"
            })
        };
    };

    return (
        <Container style={LoginStyles.Container}>
            <div style={LoginStyles.FormWrapper}> 
                <h2 style={LoginStyles.Title}>Login</h2> 
                <Form onSubmit={handleSubmit}>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            style={LoginStyles.Input}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            style={LoginStyles.Input}  
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
