import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import heroStyle from './heroStyle';

const Hero = () => {

    return (
        <Container style={heroStyle.heroContainer}>
            <Row style={heroStyle.heroTitleContainer}>
                <Col style={heroStyle.heroTitle}>
                    WaveForm Library
                </Col>
            </Row>
            {/* // search bars */}
            <Row style={heroStyle.heroSearchContainer}>
                <Col>
                    <Form.Select>
                        <option>Make</option>
                        <option>Ford</option>
                        <option>Toyota</option>
                        <option>Honda</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Select>
                        <option>Model</option>
                        <option>Camry</option>
                        <option>Civic</option>
                        <option>Mustang</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Select>
                        <option>Engine Code</option>
                        <option>1.8L L4 DOHC</option>
                        <option>2.0L Turbo</option>
                        <option>3.5L V6</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Select>
                        <option>System</option>
                        <option>Braking</option>
                        <option>Transmission</option>
                        <option>Electrical</option>
                    </Form.Select>
                </Col>
            </Row>
        </Container>
    )
}

export default Hero;