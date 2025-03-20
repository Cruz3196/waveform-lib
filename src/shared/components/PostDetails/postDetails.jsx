import React, { useEffect, useState } from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useFetchPosts from "../cards/useFetchPosts";
import postDetailsStyles from "./postDetailsStyles"; 

const PostDetails = () => {
  const { id } = useParams(); 
  const posts = useFetchPosts(); 
  const [post, setPost] = useState(null);

  useEffect(() => {
    const foundPost = posts.find((p) => p.id === id);
    setPost(foundPost);
  }, [id, posts]);

  if (!post) {
    return (
      <Container>
        <Row className="mt-3">
          <Col>
            <h3>Your Posts</h3>
            <p>No posts to display.</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <h3>Title</h3>
          <Card key={post.id}>
            <Row>
              <Col md={6}>
                <Card.Img src={post.imageUrl} alt={post.title} />
              </Col>
              <Col md={6}>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.description}</Card.Text>
                  <Card.Text>Author:{post.username}</Card.Text>
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
