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
                        <option>Model</option>
                        <option>R1S</option>
                        <option>R1T</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Select>
                        <option>ECU</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Select>
                        <option>Signal</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Select>
                        <option>Waveform</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row style={heroStyle.heroInfoContainer}>
                <Col>
                    We are dedicated to making this Library even better by adding new features and improving existing ones. However, we need your help to make this happen. You can Buy Us A Coffee to help us enhance the website's performance and customer experience. It will allow us to add features that will make your journey with the Library even more enjoyable and productive. Whether you are a frequent user or just stumbled upon our Library, your contribution will make a difference. 
                </Col>
            </Row>
        </Container>
    )
}

export default Hero;