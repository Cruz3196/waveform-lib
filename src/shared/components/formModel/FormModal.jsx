import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const FormModal = (props) => {
  return (
    <Modal show={props.modalOpen} onHide={props.handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Form</Modal.Title>
      </Modal.Header>
        <Modal.Body>
          {/* Add your form here */}
          <form>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" placeholder="Enter title" />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" rows="3" placeholder="Enter description"></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Upload File</label>
              <input type="file" className="form-control" />
            </div>
          </form>
        </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.handleModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormModal;
