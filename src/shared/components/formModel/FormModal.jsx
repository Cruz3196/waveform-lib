import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { db, storage } from "../../../features/firebase.config"; 
import firebase from 'firebase/compat/app';

const FormModal = ({ modalOpen, handleModalClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);

  // event handlers to update state variables 
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImgChange = (e) => {
    setImg(e.target.files[0]);
  };

// submit form 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!img){
      alert("Please upload an image.");
      return; 
    }
    
    // uploading to the firebase store 
    const storageRef = storage.ref();
    const imgRef = storageRef.child(`images/${img.name}`);
      await imgRef.put(img); // uploading the file 

    // get the image url 
    const imgURL = await imgRef.getDownloadURL(); 

    // save the data to firebase storage 
      await db.collection("posts").add({
        title,
        description,
        imageUrl: imgURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      }); 

    setTitle("");
    setDescription("")
    setImg(null);
    handleModalClose(); 
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
