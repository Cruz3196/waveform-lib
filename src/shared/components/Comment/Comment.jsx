import Form from 'react-bootstrap/Form';
import { BsFillSendArrowDownFill } from "react-icons/bs";
import { InputGroup } from 'react-bootstrap';

function Comment() {
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