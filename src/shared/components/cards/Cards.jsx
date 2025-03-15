import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import useFetchPosts from "./useFetchPosts";
import CardStyles from "./CardStyles";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import styles

const Cards = ({ currentPage, postsPerPage }) => {
  const posts = useFetchPosts();
  
  // State to manage loading state (simulating the delay)
  const [loading, setLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after 2 seconds
    }, 2000);

    // Clean up the timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirst = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLastPost);

  return (
    <Container style={CardStyles.CardContainer}>
      <Row>
        {loading || currentPosts.length === 0 ? (
          // If still loading or no posts are available, display skeleton loaders
          Array(postsPerPage).fill().map((_, index) => (
            <Col key={index} md={12}>
              <Card style={CardStyles.Cardbody}>
                <Row noGutters>
                  <Col md={6}>
                    <Skeleton height={200} />
                  </Col>
                  <Col md={6}>
                    <Card.Body>
                      <Skeleton width="60%" />
                      <Skeleton />
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))
        ) : (
          currentPosts.map((post) => (
            <Col key={post.id} md={12}>
              <Card style={CardStyles.Cardbody}>
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
          ))
        )}
      </Row>
    </Container>
  );
};

export default Cards;
