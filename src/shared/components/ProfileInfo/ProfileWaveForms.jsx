import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Modal, Form } from 'react-bootstrap';
import ProfileWaveFormStyles from './ProfileWaveFormStyles';
import Loader from '../Loader/loader';
import FormModal from '../formModel/FormModal'; 
import useFetchUserPosts from './useFetchUserPosts'; 
import { db } from "../../../features/firebase.config";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const ProfileWaveForms = () => {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false); 
  const [showEditModal, setShowEditModal] = useState(false); 
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPostId, setEditPostId] = useState('');
  
  const posts = useFetchUserPosts();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 3000); // Simulate an API call
  }, []);

  // Delete post logic
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "posts", id));
      toast.success("Post deleted successfully!", { position: "top-right" });
    } catch (error) {
      toast.error("Error deleting post.", { position: "top-right" });
    }
  };

  // Open the edit modal
  const openEditModal = (post) => {
    setEditTitle(post.title);
    setEditDescription(post.description);
    setEditPostId(post.id);
    setShowEditModal(true);
  };

  // Edit post logic
  const handleEdit = async () => {
    try {
      await updateDoc(doc(db, "posts", editPostId), {
        title: editTitle,
        description: editDescription,
      });
      setShowEditModal(false);
      toast.success("Post updated successfully!", { position: "top-right" });
    } catch (error) {
      toast.error("Error updating post.", { position: "top-right" });
    }
  };

  return (
    <Container style={ProfileWaveFormStyles.WaveFormContainer}>
      <Row style={ProfileWaveFormStyles.WaveFormTitleContainer}>
        <Col style={ProfileWaveFormStyles.WaveFormTitle}>WaveForm Library</Col>
      </Row>

      {loading ? (
        <Loader />
      ) : (
        <>
          <Row style={ProfileWaveFormStyles.DataTitleContainer}>
            <Col style={ProfileWaveFormStyles.DataTitle}>My Data</Col>
          </Row>

          <Row className="mt-3">
            <Col className="d-flex justify-content-center">
              <Button variant="primary" onClick={() => setModalOpen(true)}>
                Add New Post
              </Button>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <h3>Your Posts</h3>
              {posts.length === 0 ? (
                <p>No posts to display.</p>
              ) : (
                posts.map((post) => (
                  <Card key={post.id} style={{ marginBottom: "20px" }}>
                    <Row>
                      <Col md={6}>
                        <Card.Img src={post.imageUrl} alt={post.title} />
                      </Col>
                      <Col md={6}>
                        <Card.Body>
                          <Card.Title>{post.title}</Card.Title>
                          <Card.Text>{post.description}</Card.Text>
                          <Button variant="primary" onClick={() => openEditModal(post)}>
                            Edit
                          </Button>{" "}
                          <Button variant="danger" onClick={() => handleDelete(post.id)}>
                            Delete
                          </Button>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                ))
              )}
            </Col>
          </Row>
        </>
      )}

      {/* Add Post Modal */}
      <FormModal modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)} />

      {/* Edit Post Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} dialogClassName="modal-dialog-centered">
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="editDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleEdit}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProfileWaveForms;
