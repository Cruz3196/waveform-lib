import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import useFetchPosts from "./useFetchPosts";
import CardStyles from "./CardStyles";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import styles

const Cards = ({ currentPage, postsPerPage }) => {
  const posts = useFetchPosts();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirst = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLastPost);
  
  return (
    <Container style={CardStyles.CardContainer}>
      <Row className="g-4">
        {loading || currentPosts.length === 0 ? (
          // Display skeleton loaders
          Array(postsPerPage).fill().map((_, index) => (
            <Col key={index} xs={12}>
              <Card style={CardStyles.Cardbody}>
                <Row>
                  <Col md={6} style={CardStyles.ImageColumn}>
                    <Skeleton height={100} width={100} />
                  </Col>
                  <Col md={6} style={CardStyles.ContentColumn}>
                    <Card.Body>
                      <Skeleton width="60%" />
                      <Skeleton count={2} />
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))
        ) : (
          // Display posts
          currentPosts.map((post) => (
            <Col key={post.id} xs={12}>
              <Card style={CardStyles.Cardbody}>
                <Row>
                  <Col md={6} style={CardStyles.ImageColumn}>
                    {post.imageUrl && (
                      <Card.Img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        style={CardStyles.CardImage} 
                      />
                    )}
                  </Col>
                  <Col md={6} style={CardStyles.ContentColumn}>
                    <Card.Body>
                      <Card.Title style={CardStyles.TitleStyle}>{post.title}</Card.Title>
                      <Card.Text style={CardStyles.DescriptionStyle}>{post.description}</Card.Text>
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