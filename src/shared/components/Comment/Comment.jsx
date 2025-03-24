import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Comment() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Add a comment..." />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Comment;