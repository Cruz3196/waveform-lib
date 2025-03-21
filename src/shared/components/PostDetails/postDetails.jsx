import React, { useEffect, useState } from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useFetchPosts from "../cards/useFetchPosts";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Make sure this is included
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";

const PostDetails = () => {
  const { id } = useParams(); 
  const posts = useFetchPosts(); 
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    console.log("Fetching posts...");
    const foundPost = posts.find((p) => p.id === id);
    
    const timer = setTimeout(() => {
      console.log("Setting post after delay:", foundPost);
      setPost(foundPost);
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [id, posts]);

  if (loading) { 
    return (
      <Container>
        <Row className="mt-3">
          <Col xs={12}>
            <Card style={{ padding: "20px" }}>
              <Row>
                <Col md={6} style={{ height: "300px" }}>
                  <Skeleton height="100%" width="100%" />
                </Col>
                <Col md={6}>
                  <Card.Body>
                    <Skeleton width="60%" height={30} />
                    <Skeleton count={2} height={20} />
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mt-3">
        <Col>
        <div>
        <Breadcrumbs />
        </div>
        <h1>
          {post.title}
          </h1>
          <Card key={post.id}>
            <Row>
              <Col md={6}>
                <Card.Img src={post.imageUrl} alt={post.title} />
              </Col>
              <Col md={6}>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.description}</Card.Text>
                  <Card.Text>Author: {post.username}</Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PostDetails;
