import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const FormModal = ({ modalOpen, handleModalClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

  // event handlers to update state variables 
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImgChange = (e) => {
    setImg(URL.createObjectURL(e.target.files[0]));
  }

// submit form 
  const handleSubmit = (e) => {
    e.preventDefault();
    setTitle("");
    setDescription("")
    setImg("")
  }


  return (
    <Modal show={modalOpen} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input 
              type="text" 
              className="form-control"     
              placeholder="Enter title" 
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea 
              className="form-control" 
              placeholder="Enter description" 
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="mb-3">
            <label 
              className="form-label">
                Upload File
            </label>
            <input 
              type="file" 
              className="form-control"
              value={img}
              onChange={handleImgChange}
            />
          </div>
          <div className="d-flex justify-content-between">
            <Button 
              variant="primary" 
              type="submit">
                Submit
              </Button>
            <Button 
              variant="danger" 
              onClick={handleModalClose}>
                Close
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default FormModal;
