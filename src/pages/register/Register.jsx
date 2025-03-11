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
    e.preventDefault()
    try{
      await createUserWithEmailAndPassword(auth, email, password)
      const user = auth.currentUser;
      console.log(user);
      if(user){
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          username: username,
          name: name,
        });
      }
      
      toast.success("User Registration Success!", {
        position: "top-center",
      });
      console.log("User Registration Success!");
    }catch(error){
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  }

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
