import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import useFetchPosts from "./useFetchPosts";
import CardStyles from "./CardStyles";

const Cards = ({ currentPage, postsPerPage }) => {
  const posts = useFetchPosts();

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirst = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLastPost);

  return (
    <Container style={CardStyles.CardContainer}>
      <Row>
        {currentPosts.map((post) => (
          <Col 
            key={post.id} 
            md={12}
          >
            <Card 
              style={CardStyles.Cardbody}>
              <Row noGutters>
                {post.imageUrl && (
                  <Col md={6}>
                    <Card.Img src={post.imageUrl} alt={post.title} />
                  </Col>
                )}
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
