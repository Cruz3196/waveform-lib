import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import useFetchPosts from "./useFetchPosts";
import CardStyles from "./CardStyles";

const Cards = () => {
  const posts = useFetchPosts();

  return (
    <Container style={CardStyles.CardContainer}>
      <Row>
        {posts.map((post) => (
          <Col key={post.id} md={12}>
            <Card>
              <Row noGutters>
                {/* Image on the Left */}
                {post.imageUrl && (
                  <Col md={6}>
                    <Card.Img
                      src={post.imageUrl}
                      alt={post.title}
                    />
                  </Col>
                )}

                {/* Text on the Right */}
                <Col md={6}>
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.description}</Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Cards;
