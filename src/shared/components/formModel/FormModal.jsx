import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { storage } from '../../../features/firebase.config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useImageContext } from '../ImageContext/ImageContext';
import { db } from '../../../features/firebase.config';

const FormModal = ({ modalOpen, handleModalClose }) => {

  // state for title and description
  const [info, setInfo] = useState({
    title: " ",
    description: " ",
  }); 

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

// state for image upload  
  const [imgUpload, setImgUpload] = useState(null);
  const { addImage } = useImageContext(); // Access addImage from context

  const uploadImage = () => {
    if (imgUpload == null) return;
    const imgRef = ref(storage, `images/${imgUpload.name + v4()}`);
    
    uploadBytes(imgRef, imgUpload).then(() => {
      getDownloadURL(imgRef).then((url) => {
        addImage(url); // Add the image URL to the context
        alert("Image Uploaded");
      });
    });
  };
  


// for handling submission for submit button 
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    uploadImage(); // Call the image upload function when the form is submitted
    console.log("Submitted Info:", info);
  };

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
              name='title' 
              value={info.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea 
              className="form-control"
              name="description"
              value={info.description}
              onChange={handleChange} // Update state on change
              placeholder="Enter description"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Upload File</label>
            <input
              type="file"
              className="form-control"
              onChange={(event) => setImgUpload(event.target.files[0])}
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
