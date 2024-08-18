import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./updatemenu.css";

const UpdateMenu = () => {
  const [dishName, setDishName] = useState("");
  const [price, setPrice] = useState("");
  const [branch, setBranch] = useState("");
  const [toppings, setToppings] = useState("");
  const [toppingPrice, setToppingPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      dishName,
      price,
      branch,
      toppings,
      toppingPrice,
      description,
      image,
    });
  };

  return (
    <Container fluid className="dashboard-container">
      <br></br>
      <h2 className="dashboard-header">Update Menu</h2>
      <Form className="dashboard-form" onSubmit={handleSubmit}>
        <Form.Group
          as={Row}
          className="dashboard-form-group"
          controlId="dishName"
        >
          <Form.Label column sm="2">
            Dish Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              placeholder="Enter dish name"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="dashboard-form-group" controlId="price">
          <Form.Label column sm="2">
            Price
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="dashboard-form-group"
          controlId="toppings"
        >
          <Form.Label column sm="2">
            Toppings
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              value={toppings}
              onChange={(e) => setToppings(e.target.value)}
              placeholder="Enter toppings"
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="dashboard-form-group"
          controlId="toppingPrice"
        >
          <Form.Label column sm="2">
            Topping Price
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="number"
              value={toppingPrice}
              onChange={(e) => setToppingPrice(e.target.value)}
              placeholder="Enter topping price"
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="dashboard-form-group"
          controlId="description"
        >
          <Form.Label column sm="2">
            Description
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows={3}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="dashboard-form-group" controlId="image">
          <Form.Label column sm="2">
            Image
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateMenu;
