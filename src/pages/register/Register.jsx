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
    if (!email || !password || !name || !username) {
      toast.error("All fields are required!", {
        position: "top-right",
      });
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
      const user = userCredential.user;
  
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          username: username.trim(),
          name: name.trim(),
        });
  
        toast.success("User Registration Success!", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Firebase Error:", error.message);
      toast.error(error.message, {
        position: "top-right",
      });
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
