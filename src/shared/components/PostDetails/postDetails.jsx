import React, { useEffect, useState } from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useFetchPosts from "../cards/useFetchPosts";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Make sure this is included
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import CardStyles from "../cards/CardStyles";
import Comment from "../Comment/Comment";

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
                    <Skeleton count={9} height={20} />
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
          {post.vehicleModel} <span/> -  {post.system}
          </h1>
          <Card key={post.id} style={CardStyles.Cardbody}>
            <Row>
              <Col md={6}  style={CardStyles.ImageColumn}>
                <Card.Img src={post.imageUrl} alt={post.title} style={CardStyles.CardImage} />
              </Col>
              <Col md={6} style={CardStyles.ContentColumn}>
                <Card.Body>
                  <Card.Text><strong>Vehicle Model:</strong> {post.vehicleModel}</Card.Text>
                      <Card.Text><strong>Mileage:</strong> {post.mileage}</Card.Text>
                      <Card.Text><strong>System:</strong> {post.system}</Card.Text>
                      <Card.Text><strong>Location:</strong> {post.location}</Card.Text>
                      <Card.Text><strong>Connector Type:</strong> {post.connectorType}</Card.Text>
                      <Card.Text><strong>Oscilloscope Channels:</strong></Card.Text>
                        <ul style={{ paddingLeft: "20px" }}>
                          {post.channels?.ch1 && <li>Channel 1: {post.channels.ch1}</li>}
                          {post.channels?.ch2 && <li>Channel 2: {post.channels.ch2}</li>}
                          {post.channels?.ch3 && <li>Channel 3: {post.channels.ch3}</li>}
                          {post.channels?.ch4 && <li>Channel 4: {post.channels.ch4}</li>}
                        </ul>
                      <Card.Text><strong>Details:</strong> {post.details}</Card.Text>
                      <Card.Subtitle className="mb-2 text-muted">
                        Posted by: {post.username || "Unknown"}
                      </Card.Subtitle>
                      <Card.Text style={CardStyles.DescriptionStyle}>Signal added at: <span/>
                        {post.created ? post.created.toDate().toLocaleString("en-US", { 
                            year: "numeric", month: "long", day: "numeric", 
                            hour: "2-digit", minute: "2-digit", second: "2-digit", 
                            timeZoneName: "short" 
                        }) : "No date available"}
                      </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>

          {/* Comment Section  */}
          <Comment postId={id} />
        </Col>
      </Row>
    </Container>
  );
};

export default PostDetails;
