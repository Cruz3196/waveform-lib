import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileWaveFormStyles from './ProfileWaveFormStyles';
import Loader from '../Loader/loader';

const ProfileWaveForms = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data (API call)
    setTimeout(() => {
      setLoading(false); 
    }, 3000); // Replace with actual API call
  }, []);

  return (
    <Container style={ProfileWaveFormStyles.WaveFormContainer}>
        <Row style={ProfileWaveFormStyles.WaveFormTitleContainer}>
            <Col style={ProfileWaveFormStyles.WaveFormTitle}>
                WaveForm Library
            </Col>
        </Row>

        {loading ? (
          <Loader />
        ) : (
          <Row style={ProfileWaveFormStyles.DataTitleContainer}>
            <Col style={ProfileWaveFormStyles.DataTitle}>My Data </Col>
          </Row>
        )}
    </Container>
  )
}

export default ProfileWaveForms;
