import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import FooterStyles from './FooterStyles'

const Footer = () => {
    return (
        <Container fluid style={FooterStyles.FooterContainer}>
            <Row>
                <Col style={FooterStyles.FooterComponents}>
                    <div>
                        <h1>
                            Footer
                        </h1>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Footer