import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { db, auth } from "../../../features/firebase.config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

const FormModal = ({ modalOpen, handleModalClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleImgChange = (e) => setImg(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!img) {
      toast.error("Please upload an image!", { position: "right" });
      return;
    }
  
    const user = auth.currentUser;
    if (!user) {
      toast.error("You must be logged in to post!", { position: "top-right" });
      return;
    }
  
    try {
      const storage = getStorage();
      const imgRef = ref(storage, `images/${img.name}`);
  
      await uploadBytes(imgRef, img);
      const imgURL = await getDownloadURL(imgRef);
  
      await addDoc(collection(db, "posts"), {
        title,
        description,
        imageUrl: imgURL,
        userId: user.uid,
        username: user.displayName || user.email, 
        created: serverTimestamp(),
      });
  
      setTitle("");
      setDescription("");
      setImg(null);
      handleModalClose();
  
      toast.success("Post uploaded successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error uploading post: ", error);
      toast.error("Error uploading post. Please try again.", {
        position: "top-right",
      });
    }
  };
  

  return (
    <Modal show={modalOpen} onHide={handleModalClose} dialogClassName="modal-dialog-centered">
      <Modal.Header closeButton>
        <Modal.Title>Create a Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input type="text" className="form-control" placeholder="Enter title" value={title} onChange={handleTitleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" placeholder="Enter description" value={description} onChange={handleDescriptionChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Upload File</label>
            <input type="file" className="form-control" onChange={handleImgChange} />
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
