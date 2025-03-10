import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import registerStyles from './RegisterStyles'; 
import { useUserAuth } from '../../features/context/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../../features/firebase.config'; 
import { doc, setDoc, collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore';

const Register = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(""); 
  const { signUp } = useUserAuth(); 
  let navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(""); 

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Check if login (username) already exists
      const loginQuery = query(collection(db, "users"), where("login", "==", login));
      const loginSnapshot = await getDocs(loginQuery);

      if (!loginSnapshot.empty) {
        setError("Username already taken");
        return;
      }

      // Create user in Firebase Auth
      const userCredential = await signUp(email, password);
      const user = userCredential.user;

      // Store additional user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid, 
        name,
        login,
        email,
        createdAt: serverTimestamp()
      });

      navigate("/profile"); // Redirect to profile page

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container style={registerStyles.Container}>
      <div style={registerStyles.FormWrapper}>
        <h2 style={registerStyles.Title}>Sign Up</h2>
        <Form onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <Form.Group className="mb-3">
            <Form.Control 
              style={registerStyles.Input} 
              type="text" 
              placeholder="Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control 
              style={registerStyles.Input} 
              type="text" 
              placeholder="Username"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control 
              style={registerStyles.Input} 
              type="email" 
              placeholder="E-Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control 
              style={registerStyles.Input} 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control 
              style={registerStyles.Input} 
              type="password" 
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
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
