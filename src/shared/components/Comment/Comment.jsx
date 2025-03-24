import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { BsFillSendArrowDownFill } from "react-icons/bs";
import { InputGroup } from 'react-bootstrap';
import { auth } from '../../../features/firebase.config';

function Comment() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <Form>
      <InputGroup className="mb-3">
        <Form.Control 
          type="text" 
          placeholder="Add a comment..." 
          disabled={!user} // Disable input if not logged in
        />
        <InputGroup.Text>
          <BsFillSendArrowDownFill 
            style={{ cursor: user ? 'pointer' : 'not-allowed', opacity: user ? 1 : 0.5 }}
            onClick={() => {
              if (user) {
                console.log('Comment submitted');
              } else {
                console.log('User must be logged in to comment');
              }
            }} 
          />
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
}

export default Comment;
