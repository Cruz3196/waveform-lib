import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import useFetchPosts from "./useFetchPosts";

const Cards = () => {
  const posts = useFetchPosts();

  return (
    <Row className="g-4">
        {posts.map((post) => (
          <Col key={post.id} md={4}>
            <Card>
              {post.imageUrl && (
                <Card.Img variant="top" src={post.imageUrl} alt={post.title} />
              )}
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
    </Row>
  );
};

export default Cards;
