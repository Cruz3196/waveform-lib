import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { db } from "../../../features/firebase.config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

const FormModal = ({ modalOpen, handleModalClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null); 

  
  // event handlers to update state variables
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleImgChange = (e) => setImg(e.target.files[0]);

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!img) {
      toast.error("Please upload an image!", {
        position:"top-center"
      });
      return;
    }

    try {
      const storage = getStorage(); // Initialize Firebase Storage
      const imgRef = ref(storage, `images/${img.name}`);

      // Upload file to Firebase Storage
      await uploadBytes(imgRef, img);

      // Get the image URL
      const imgURL = await getDownloadURL(imgRef);

      // Save post data to Firestore
      await addDoc(collection(db, "posts"), {
        title,
        description,
        imageUrl: imgURL,
        timestamp: serverTimestamp(),
      });

      // Reset form fields
      setTitle("");
      setDescription("");
      setImg(null);
      handleModalClose();

    toast.success("Image Uploaded Success!", {
      position: "top-right",
    });
    } catch (error) {
      console.error("Error uploading image: ", error);
      toast.error("Error uploading image. Please try again.", {
        position: "top-right"
      });
    }
  };

  return (
    <Modal 
      show={modalOpen} 
      onHide={handleModalClose}
      dialogClassName="modal-dialog-centered"
      >
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
            <label className="form-label">Upload File</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImgChange}
            />
          </div>
          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="danger" onClick={handleModalClose}>
              Close
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default FormModal;
