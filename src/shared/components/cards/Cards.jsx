import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link
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
          Array(postsPerPage).fill().map((_, index) => (
            <Col key={index} xs={12}>
              <Card style={CardStyles.Cardbody}>
                <Row>
                  <Col md={6} style={CardStyles.ImageColumn}>
                    <div style={{ width: "100%", height: "300px" }}>
                      <Skeleton height="300px" width="100%" />
                    </div>
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
          currentPosts.map((post) => (
            <Col key={post.id} xs={12}>
              {/* Wrap Card with Link to PostDetails */}
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
                        <Card.Subtitle className="mb-2 text-muted">
                          Posted by: {post.username || "Unknown"}
                        </Card.Subtitle>
                          <Card.Title style={CardStyles.TitleStyle}>{post.title}</Card.Title>
                          <Card.Text style={CardStyles.DescriptionStyle}>{post.description}</Card.Text>
                          <Card.Text style={CardStyles.DescriptionStyle}>Signal added at: <span/>
                            {post.created ? post.created.toDate().toLocaleString("en-US", { 
                                year: "numeric", month: "long", day: "numeric", 
                                hour: "2-digit", minute: "2-digit", second: "2-digit", 
                                timeZoneName: "short" 
                            }) : "No date available"}
                          </Card.Text>

                        <Button>
                          <Link to={`/post/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            More Details
                          </Link>
                        </Button>
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
