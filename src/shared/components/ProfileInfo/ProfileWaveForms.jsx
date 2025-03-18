import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ProfileWaveFormStyles from './ProfileWaveFormStyles';
import Loader from '../Loader/loader';
import FormModal from '../formModel/FormModal'; 

const ProfileWaveForms = () => {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false); // Manage modal state

  useEffect(() => {
    // Simulate fetching data (API call)
    setTimeout(() => {
      setLoading(false); 
    }, 3000); // Replace with actual API call
  }, []);

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
        </>
      )}

      {/* Form Modal Component */}
      <FormModal modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)} />
    </Container>
  );
};

export default ProfileWaveForms;
