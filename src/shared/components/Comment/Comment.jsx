import Form from 'react-bootstrap/Form';
import { BsFillSendArrowDownFill } from "react-icons/bs";
import { InputGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function Comment() {
  const [users, setUsers] = useState(""); 
  const [comments, setComments] = useState("");
  const [timestamp, setTimestamp] = useState(null); 

    useEffect(() => {

    });

  return (
    <Form>
      <InputGroup className="mb-3">
        <Form.Control 
          type="text" 
          placeholder="Add a comment..." 
        />
        <InputGroup.Text>
          <BsFillSendArrowDownFill 
            style={{ cursor: 'pointer' }}
            onClick={() => {
              
              // Handle submit action here
              console.log('Comment submitted');
            }} 
          />
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
}

export default Comment;