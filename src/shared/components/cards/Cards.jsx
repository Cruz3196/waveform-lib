import React from 'react';
import { Card } from 'react-bootstrap';
import { useImageContext } from '../ImageContext/ImageContext';

const Cards = () => {
  const { imageList } = useImageContext(); // Access imageList from context

  return (
    <div className="d-flex flex-wrap">
      {imageList.map((image, index) => (
        <Card key={index} className="m-2" style={{ width: '18rem' }}>
          <Card.Img variant="top" src={image} />
          <Card.Body>
            <Card.Title>Title</Card.Title>
            <Card.Text>Description</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Cards;
