import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../features/firebase.config";
import { toast } from "react-toastify";

const DeleteModal = ({ showDeleteModal, handleCloseDeleteModal, postToDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!postToDelete) return;
        
        // Prevent double delete
        if (isDeleting) return;
        setIsDeleting(true);
        
        try {
            await deleteDoc(doc(db, "posts", postToDelete.id));
            toast.success("Post deleted successfully!", { position: "top-right" });
            handleCloseDeleteModal();
        } catch (error) {
            console.error("Error deleting post: ", error);
            toast.error("Error deleting post. Please try again.", { position: "top-right" });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this post? This action cannot be undone.</p>
                {postToDelete && (
                    <div className="mt-3">
                        <p><strong>Post details:</strong></p>
                        <p><strong>Vehicle Model:</strong> {postToDelete.vehicleModel}</p>
                        <p><strong>System:</strong> {postToDelete.system}</p>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDeleteModal} disabled={isDeleting}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? "Deleting..." : "Delete Post"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;