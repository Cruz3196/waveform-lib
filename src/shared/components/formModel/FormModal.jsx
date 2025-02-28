import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const FormModal = ({ modalOpen, handleModalClose }) => {

  return (
    <Modal show={modalOpen} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form >
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input type="text" className="form-control"     placeholder="Enter title" />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" placeholder="Enter description" />
          </div>
          <div className="mb-3">
            <label className="form-label">Upload File</label>
            <input type="file" className="form-control"/>
          </div>
          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit">Submit</Button>
            <Button variant="danger" onClick={handleModalClose}>Close</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default FormModal;
