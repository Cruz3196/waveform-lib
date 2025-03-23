import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Modal, Form } from 'react-bootstrap';
import ProfileWaveFormStyles from './ProfileWaveFormStyles';
import FormModal from '../formModel/FormModal'; 
import useFetchUserPosts from './useFetchUserPosts'; // Custom hook for fetching posts
import { db } from "../../../features/firebase.config";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import CardStyles from '../cards/CardStyles';
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
              <Card style={CardStyles.Cardbody}>
                <Row>
                  <Col md={6} style={CardStyles.ImageColumn}>
                    <div style={{ width: "100%", height: "100%" }}>
                      <Skeleton height="100%" width="100%" />
                    </div>
                  </Col>
                  <Col md={6} style={CardStyles.ContentColumn}>
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
                  <Card key={post.id} style={CardStyles.Cardbody}>
                    <Row>
                      <Col md={6} style={CardStyles.ImageColumn}>
                        <Card.Img src={post.imageUrl} alt={post.title} style={CardStyles.CardImage} />
                      </Col>
                            <Col md={6} style={ProfileWaveFormStyles.ContentColumn}>
                              <Card.Body>
                              <Card.Text><strong>Vehicle Model:</strong> {post.vehicleModel}</Card.Text>
                            <Card.Text><strong>Mileage:</strong> {post.mileage}</Card.Text>
                            <Card.Text><strong>System:</strong> {post.system}</Card.Text>
                            <Card.Text><strong>Location:</strong> {post.location}</Card.Text>
                            <Card.Text><strong>Connector Type:</strong> {post.connectorType}</Card.Text>
                            <Card.Text><strong>Oscilloscope Channels:</strong></Card.Text>
                              <ul style={{ paddingLeft: "20px" }}>
                                {post.channels?.ch1 && <li>Channel 1: {post.channels.ch1}</li>}
                                {post.channels?.ch2 && <li>Channel 2: {post.channels.ch2}</li>}
                                {post.channels?.ch3 && <li>Channel 3: {post.channels.ch3}</li>}
                                {post.channels?.ch4 && <li>Channel 4: {post.channels.ch4}</li>}
                              </ul>
                            <Card.Text><strong>Details:</strong> {post.details}</Card.Text>
                            <Card.Subtitle className="mb-2 text-muted">
                              Posted by: {post.username || "Unknown"}
                            </Card.Subtitle>
                            <Card.Text style={CardStyles.DescriptionStyle}>Signal added at: <span/>
                              {post.created ? post.created.toDate().toLocaleString("en-US", { 
                                  year: "numeric", month: "long", day: "numeric", 
                                  hour: "2-digit", minute: "2-digit", second: "2-digit", 
                                  timeZoneName: "short" 
                              }) : "No date available"}
                            </Card.Text>
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
