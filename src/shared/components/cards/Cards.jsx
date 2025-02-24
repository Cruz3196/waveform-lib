import React, { useEffect, useState } from 'react';
import { db } from '../../../features/apis/firebase/firebase.config';
import { collection, onSnapshot } from 'firebase/firestore';
import { Card } from 'react-bootstrap';

const Cards = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'uploads'), (snapshot) => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {items.map(item => (
        <Card key={item.id} className="m-2" style={{ width: '18rem' }}>
          {item.fileURL && <Card.Img variant="top" src={item.fileURL} />}
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Cards;
