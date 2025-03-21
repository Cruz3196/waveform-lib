import React, { useState }  from 'react';
import { Form, Button, Container} from 'react-bootstrap';
import registerStyles from './RegisterStyles'; 
import { auth,  db } from '../../features/firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';


const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      if (!user) {
        throw new Error("User registration failed.");
      }
  
      console.log("User authenticated:", user.uid);
  
      // Firestore document creation
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        username: username.trim(),  // Ensure no accidental spaces
        name: name.trim(),
      });

        // clearing form after registering 
      setEmail("");
      setPassword("");
      setName("");
      setUsername("");

  
      toast.success("User Registration Success!", { position: "top-right" });

      window.location.href ="/login";
      
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message, { position: "top-right" });
    }
  };
  

  return (
    <Container style={registerStyles.Container}>
      <div style={registerStyles.FormWrapper}>
        <h2 style={registerStyles.Title}>Sign Up</h2>
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Control 
              style={registerStyles.Input} 
              type="text" 
              placeholder="Name" 
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control 
              style={registerStyles.Input} 
              type="text" 
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control 
              style={registerStyles.Input} 
              type="email" 
              placeholder="E-Mail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control 
              style={registerStyles.Input} 
              type="password" 
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)}
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
