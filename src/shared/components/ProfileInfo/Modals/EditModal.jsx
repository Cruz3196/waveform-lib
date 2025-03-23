import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../features/firebase.config";
import { toast } from "react-toastify";

const EditModal = ({ showEditModal, handleCloseEditModal, postToEdit }) => {
    const [editedPost, setEditedPost] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (postToEdit) {
            setEditedPost({ ...postToEdit });
        }
    }, [postToEdit]);

    const handleEdit = async (e) => {
        e.preventDefault();
        
        if (!editedPost) return;
        
        // Prevent double submissions
        if (isSubmitting) return;
        setIsSubmitting(true);
        
        try {
            await updateDoc(doc(db, "posts", editedPost.id), {
                vehicleModel: editedPost.vehicleModel,
                mileage: editedPost.mileage,
                system: editedPost.system,
                location: editedPost.location,
                connectorType: editedPost.connectorType,
                channels: editedPost.channels,
                details: editedPost.details
            });

            handleCloseEditModal();
            toast.success("Post updated successfully!", { position: "top-right" });
        } catch (error) {
            console.error("Error updating post: ", error);
            toast.error("Error updating post. Please try again.", {
                position: "top-right",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal show={showEditModal} onHide={handleCloseEditModal} dialogClassName="modal-dialog-centered modal-lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {editedPost && (
                    <Form onSubmit={handleEdit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Vehicle Model</Form.Label>
                            <Form.Select
                                value={editedPost.vehicleModel || ""}
                                onChange={(e) => setEditedPost({...editedPost, vehicleModel: e.target.value})}
                            >   
                                <option value="">Select a model</option>
                                <option value="R1X - Origin (Gen1)">R1X - Origin (Gen1)</option>
                                <option value="R1X - Peregrine(Gen1.6)">R1X - Peregrine(Gen1.6)</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mileage</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedPost.mileage || ""}
                                onChange={(e) => setEditedPost({...editedPost, mileage: e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>System</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedPost.system || ""}
                                onChange={(e) => setEditedPost({...editedPost, system: e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedPost.location || ""}
                                onChange={(e) => setEditedPost({...editedPost, location: e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Connector Type</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedPost.connectorType || ""}
                                onChange={(e) => setEditedPost({...editedPost, connectorType: e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Oscilloscope Channels</Form.Label>
                            <Form.Control
                                type="text"
                                className="mb-2"
                                placeholder="Channel 1"
                                value={editedPost.channels?.ch1 || ""}
                                onChange={(e) => setEditedPost({
                                    ...editedPost,
                                    channels: { ...editedPost.channels, ch1: e.target.value }
                                })}
                            />
                            <Form.Control
                                type="text"
                                className="mb-2"
                                placeholder="Channel 2"
                                value={editedPost.channels?.ch2 || ""}
                                onChange={(e) => setEditedPost({
                                    ...editedPost,
                                    channels: { ...editedPost.channels, ch2: e.target.value }
                                })}
                            />
                            <Form.Control
                                type="text"
                                className="mb-2"
                                placeholder="Channel 3"
                                value={editedPost.channels?.ch3 || ""}
                                onChange={(e) => setEditedPost({
                                    ...editedPost,
                                    channels: { ...editedPost.channels, ch3: e.target.value }
                                })}
                            />
                            <Form.Control
                                type="text"
                                className="mb-2"
                                placeholder="Channel 4"
                                value={editedPost.channels?.ch4 || ""}
                                onChange={(e) => setEditedPost({
                                    ...editedPost,
                                    channels: { ...editedPost.channels, ch4: e.target.value }
                                })}
                            />  
                        </Form.Group>
                    
                        <Form.Group className="mb-3">
                            <Form.Label>Details</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={editedPost.details || ""}
                                onChange={(e) => setEditedPost({...editedPost, details: e.target.value})}
                            />
                        </Form.Group>
                        
                        <div className="d-flex justify-content-between">
                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Updating..." : "Update"}
                            </Button>
                            <Button variant="danger" onClick={handleCloseEditModal} disabled={isSubmitting}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default EditModal;