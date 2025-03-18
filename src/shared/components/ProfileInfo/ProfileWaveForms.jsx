import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Modal, Form } from 'react-bootstrap';
import ProfileWaveFormStyles from './ProfileWaveFormStyles';
import FormModal from '../formModel/FormModal'; 
import useFetchUserPosts from './useFetchUserPosts'; // Custom hook for fetching posts
import { db } from "../../../features/firebase.config";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Skeleton from 'react-loading-skeleton'; // Import the Skeleton loader (if not globally imported)

const ProfileWaveForms = () => {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false); // Manage modal state for adding a new post
  const [showEditModal, setShowEditModal] = useState(false); // Manage modal state for editing a post
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPostId, setEditPostId] = useState('');
  
  const posts = useFetchUserPosts(); // Fetch posts specific to the user

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
      
      <>
        <Row style={ProfileWaveFormStyles.DataTitleContainer}>
          <Col style={ProfileWaveFormStyles.DataTitle}>My Data</Col>
        </Row>

        <Row className="mt-3">
          <Col style={ProfileWaveFormStyles.AddPostButtonContainer}>
            {loading ? (
              <Skeleton width={200} height={40} />
            ) : (
              <Button
                variant="primary"
                onClick={() => setModalOpen(true)}
                style={ProfileWaveFormStyles.AddPostButton}
              >
                Add New Post
              </Button>
            )}
          </Col>
        </Row>

        {/* Display posts or skeleton */}
        {loading ? (
          <Row className="mt-3">
            <Col md={12}>
              <Card style={ProfileWaveFormStyles.Cardbody}>
                <Row>
                  <Col md={6} style={ProfileWaveFormStyles.ImageColumn}>
                    <div style={{ width: "100%", height: "100%" }}>
                      <Skeleton height="100%" width="100%" />
                    </div>
                  </Col>
                  <Col md={6} style={ProfileWaveFormStyles.ContentColumn}>
                    <Card.Body>
                      <Skeleton width="80%" height={20} />
                      <Skeleton count={2} />
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        ) : (
          <Row className="mt-3">
            <Col>
              <h3>Your Posts</h3>
              {posts.length === 0 ? (
                <p>No posts to display.</p>
              ) : (
                posts.map((post) => (
                  <Card key={post.id} style={ProfileWaveFormStyles.Cardbody}>
                    <Row>
                      <Col md={6} style={ProfileWaveFormStyles.ImageColumn}>
                        <Card.Img src={post.imageUrl} alt={post.title} style={ProfileWaveFormStyles.CardImage} />
                      </Col>
                      <Col md={6} style={ProfileWaveFormStyles.ContentColumn}>
                        <Card.Body>
                          <Card.Title style={ProfileWaveFormStyles.TitleStyle}>{post.title}</Card.Title>
                          <Card.Text style={ProfileWaveFormStyles.DescriptionStyle}>{post.description}</Card.Text>
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
        )}
      </>
      
      {/* Add Post Modal */}
      <FormModal modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)} />

      {/* Edit Post Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
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
