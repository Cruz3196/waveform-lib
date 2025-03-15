import React from "react";
import { Card, Col } from "react-bootstrap";
import SkeletonLoaderStyles from "./SkeletonLoaderStyles";

const SkeletonLoader = () => (
  <Col md={4} className="mb-4">
    <Card>
      <div style={SkeletonLoaderStyles.SkeletonTitle} />
      <Card.Body>
        <div style={SkeletonLoaderStyles.SkeletonInput} />
        <div style={SkeletonLoaderStyles.SkeletonInput} />
        <div style={SkeletonLoaderStyles.SkeletonInput} />
      </Card.Body>
    </Card>
  </Col>
);

export default SkeletonLoader;
