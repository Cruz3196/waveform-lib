import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import ProfileWaveFormStyles from './ProfileWaveFormStyles';
import FormModal from '../formModel/FormModal'; 
import EditModal from './Modals/EditModal';  // Import the new EditModal
import DeleteModal from './Modals/DeleteModal';  // Import the new DeleteModal
import useFetchUserPosts from './useFetchUserPosts';
import Skeleton from 'react-loading-skeleton'; 

const ProfileWaveForms = () => {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Edit modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  
  // Delete modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  
  const posts = useFetchUserPosts(); // Fetch posts specific to the user

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 3000); // Simulate an API call
  }, []);

  // Open the edit modal
  const openEditModal = (post) => {
    setPostToEdit(post);
    setShowEditModal(true);
  };

  // Close edit modal
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setPostToEdit(null);
  };

  // Open the delete modal
  const openDeleteModal = (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  // Close delete modal
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setPostToDelete(null);
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
                        <Card.Img src={post.imageUrl} alt={post.vehicleModel} style={ProfileWaveFormStyles.CardImage} />
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
                          <Card.Text style={ProfileWaveFormStyles.DescriptionStyle}>Signal added at: <span/>
                            {post.created ? post.created.toDate().toLocaleString("en-US", { 
                                year: "numeric", month: "long", day: "numeric", 
                                hour: "2-digit", minute: "2-digit", second: "2-digit", 
                                timeZoneName: "short" 
                            }) : "No date available"}
                          </Card.Text>
                          <Button variant="primary" onClick={() => openEditModal(post)}>
                            Edit
                          </Button>{" "}
                          <Button variant="danger" onClick={() => openDeleteModal(post)}>
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

      {/* Edit Post Modal - Using the separate component */}
      <EditModal 
        showEditModal={showEditModal} 
        handleCloseEditModal={handleCloseEditModal} 
        postToEdit={postToEdit} 
      />

      {/* Delete Post Modal - Using the separate component */}
      <DeleteModal 
        showDeleteModal={showDeleteModal} 
        handleCloseDeleteModal={handleCloseDeleteModal} 
        postToDelete={postToDelete} 
      />
    </Container>
  );
};

export default ProfileWaveForms;