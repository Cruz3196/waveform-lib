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
  const [vehicleModel, setVehicleModel] = useState("");
  const [mileage, setMileage] = useState("");
  const [system, setSystem] = useState("");
  const [location, setLocation] = useState("");
  const [connectorType, setConnectorType] = useState("");
  const [channels, setChannels] = useState({ ch1: "", ch2: "", ch3: "", ch4: "" });
  const [details, setDetails] = useState("");

  const handleImgChange = (e) => setImg(e.target.files[0]);
  const handleChannelsChange = (e, channel) => {
    setChannels({ ...channels, [channel]: e.target.value });
  };

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
        vehicleModel,
        mileage,
        system,
        location,
        connectorType,
        channels,
        details
      });
  
      setTitle("");
      setDescription("");
      setImg(null);
      setVehicleModel("");
      setMileage("");
      setSystem("");
      setLocation("");
      setConnectorType("");
      setChannels({ ch1: "", ch2: "", ch3: "", ch4: "" });
      setDetails("");
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
    <Modal show={modalOpen} onHide={handleModalClose} dialogClassName="modal-dialog-centered modal-lg">
      <Modal.Header closeButton>
        <Modal.Title>Create a Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Vehicle Model</label>
            <select className="form-control" value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)}>
              <option value="">Select a model</option>
              <option value="Model 1">R1X - Origin (Gen1)</option>
              <option value="Model 2">R1X - Peregrine(Gen1.6)</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Mileage</label>
            <input type="text" className="form-control" value={mileage} onChange={(e) => setMileage(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">System</label>
            <input type="text" className="form-control" value={system} onChange={(e) => setSystem(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Location</label>
            <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Connector Type</label>
            <input type="text" className="form-control" value={connectorType} onChange={(e) => setConnectorType(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Oscilloscope Channels</label>
            <input type="text" className="form-control mb-2" placeholder="Channel 1" value={channels.ch1} onChange={(e) => handleChannelsChange(e, 'ch1')} />
            <input type="text" className="form-control mb-2" placeholder="Channel 2" value={channels.ch2} onChange={(e) => handleChannelsChange(e, 'ch2')} />
            <input type="text" className="form-control mb-2" placeholder="Channel 3" value={channels.ch3} onChange={(e) => handleChannelsChange(e, 'ch3')} />
            <input type="text" className="form-control mb-2" placeholder="Channel 4" value={channels.ch4} onChange={(e) => handleChannelsChange(e, 'ch4')} />
          </div>
          <div className="mb-3">
            <label className="form-label">Details</label>
            <textarea className="form-control" value={details} onChange={(e) => setDetails(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Upload File</label>
            <input type="file" className="form-control" onChange={handleImgChange} />
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
