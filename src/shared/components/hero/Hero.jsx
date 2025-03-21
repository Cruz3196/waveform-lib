import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import heroStyle from './heroStyle';

const Hero = () => {
    const [loading, setLoading] = useState(true);

    // Simulate loading process
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000); // Simulate a loading state for 2 seconds
    }, []);

    return (
        <Container style={heroStyle.heroContainer}>
            <Row style={heroStyle.heroTitleContainer}>
                <Col style={heroStyle.heroTitle}>
                    {loading ? <Skeleton width={200} height={40} /> : 'WaveForm Library'}
                </Col>
            </Row>
            {/* Search bars */}
            <Row style={heroStyle.heroSearchContainer}>
                <Col>
                    {loading ? <Skeleton height={40} /> : (
                        <Form.Select>
                            <option>Model</option>
                            <option>R1S</option>
                            <option>R1T</option>
                        </Form.Select>
                    )}
                </Col>
                <Col>
                    {loading ? <Skeleton height={40} /> : (
                        <Form.Select>
                            <option>ECU</option>
                        </Form.Select>
                    )}
                </Col>
                <Col>
                    {loading ? <Skeleton height={40} /> : (
                        <Form.Select>
                            <option>Signal</option>
                        </Form.Select>
                    )}
                </Col>
                <Col>
                    {loading ? <Skeleton height={40} /> : (
                        <Form.Select>
                            <option>Waveform</option>
                        </Form.Select>
                    )}
                </Col>
            </Row>
            <Row style={heroStyle.heroInfoContainer}>
                <Col>
                    {loading ? <Skeleton width={1000} height={40} /> : (
                        'We are dedicated to making this Library even better by adding new features and improving existing ones. However, we need your help to make this happen. You can Buy Us A Coffee to help us enhance the website\'s performance and customer experience. It will allow us to add features that will make your journey with the Library even more enjoyable and productive. Whether you are a frequent user or just stumbled upon our Library, your contribution will make a difference.'
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default Hero;
