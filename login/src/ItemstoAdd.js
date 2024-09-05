import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Table,
  ListGroup,
} from "react-bootstrap";
import axios from "axios"; // Axios for API requests
import "./itemstoadd.css";

const ItemsToAdd = () => {
  const [availableItems, setAvailableItems] = useState([]);
  const [currentBranchItems, setCurrentBranchItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Fetch current branch menu
        const branchMenuResponse = await axios.get(
          `http://127.0.0.1:8000/menu/${user.branch}/`
        );
        const currentBranchMenu = Object.values(branchMenuResponse.data).flat();
        setCurrentBranchItems(currentBranchMenu);
        console.log(currentBranchItems);

        // Fetch items not in current branch
        const otherBranchMenuResponse = await axios.get(
          `http://127.0.0.1:8000/othermenu/${user.branch}/`
        );
        const itemsNotInCurrentBranch = Object.values(
          otherBranchMenuResponse.data
        ).flat();
        setAvailableItems(itemsNotInCurrentBranch);
        console.log(itemsNotInCurrentBranch);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchItems();
  }, [user.branch]);

  const handleSelectItem = (itemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const handleAddItems = () => {
    console.log("Items to add:", selectedItems);
  };

  return (
    <div className="container">
      <h2 className="text-center mb-5">
        Welcome {user.username} from {user.branch}
      </h2>
      <Row>
        <br></br>
        <Col md={6}>
          <h4>Add Dishes</h4>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Item Name</th>
                  <th>Available at Branch</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {availableItems.map((item) => (
                  <tr key={item.name}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        onChange={() => handleSelectItem(item.name)}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.branch}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button
              variant="primary"
              type="button"
              onClick={handleAddItems}
              disabled={selectedItems.length === 0}
              className="w-100"
            >
              Add Selected Items
            </Button>
          </Form>
          <br></br>
        </Col>
        <Col md={6}>
          <h4>Current Branch Menu</h4>
          <ListGroup>
            {currentBranchItems.map((item) => (
              <ListGroup.Item key={item.name}>
                {item.name}
                <br /> {item.price}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ItemsToAdd;
