import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Reclamations = () => {
  const [reclamations, setReclamations] = useState([]);
  const [show, setShow] = useState(false);
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const user = JSON.parse(localStorage.getItem('user')); // Assuming the user is stored in localStorage after login

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchReclamations = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3002/api/reclamations/user/${userId}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setReclamations(data);
      }
    } catch (error) {
      console.error("Error fetching reclamations:", error);
    }
  };

  const addReclamation = async () => {
    const newReclamation = {
      titre: titre,
      description: description,
      userId: user._id // Pass the logged-in user's ID
    };

    try {
      const response = await fetch('http://localhost:3002/api/reclamations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReclamation)
      });

      if (response.ok) {
        fetchReclamations(user._id); // Refresh the reclamations after adding a new one
        handleClose(); // Close the modal after successfully adding the reclamation
      }
    } catch (error) {
      console.error("Error adding reclamation:", error);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchReclamations(user._id);
    }
  }, [user]);

  return (
    <div>
      <h2>Reclamations for the Logged-In User</h2>
      {reclamations.map((reclamation, index) => (
        <Card key={index} style={{ width: '18rem', marginBottom: '1rem' }}>
          <Card.Body>
            <Card.Title>{reclamation.titre}</Card.Title>
            <Card.Text>{reclamation.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
      <button onClick={handleShow}>Add Reclamation</button> {/* Example button to trigger the modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Reclamation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formTitre">
            <Form.Label>Titre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter titre"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addReclamation}>
            Save Reclamation
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Reclamations;
