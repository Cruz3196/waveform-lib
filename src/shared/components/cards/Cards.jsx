import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useImageContext } from '../ImageContext/ImageContext';

const Cards = () => {
  const { imageList, deleteImage } = useImageContext();

  return (
    <div className="d-flex flex-wrap">
      {imageList.map((imageURL, index) => (
        <Card key={index} className="m-2" style={{ width: '18rem' }}>
          <Card.Img variant="top" src={imageURL} />
          <Card.Body>
            <Button variant="danger" onClick={() => deleteImage(imageURL)}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Cards;
