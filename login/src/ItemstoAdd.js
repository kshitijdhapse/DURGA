import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Table,
  ListGroup,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./itemstoadd.css";

const ItemsToAdd = () => {
  const [availableItems, setAvailableItems] = useState([]);
  const [currentBranchItems, setCurrentBranchItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const branchMenuResponse = await axios.get(
          `http://127.0.0.1:8000/menu/${user.branch}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token
            },
          }
        );
        const currentBranchMenu = Object.values(branchMenuResponse.data).flat();
        setCurrentBranchItems(currentBranchMenu);

        const otherBranchMenuResponse = await axios.get(
          `http://127.0.0.1:8000/othermenu/${user.branch}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token
            },
          }
        );
        const itemsNotInCurrentBranch = Object.values(
          otherBranchMenuResponse.data
        ).flat();
        setAvailableItems(itemsNotInCurrentBranch);
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

  const handleAddItems = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/addbranchitem/",
        {
          items: selectedItems,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Token-based auth
          },
        }
      );

      if (response.status === 200) {
        setAlertMessage("Items added successfully!");
        setAlertVariant("success");
        setShow(true);
        setTimeout(() => {
          setShow(false);
          navigate("/items-to-add");
        }, 2000);
      } else {
        setAlertMessage(response.data.detail || "Failed to add items.");
        setAlertVariant("danger");
        setShow(true);
      }
    } catch (error) {
      if (error.response) {
        setAlertMessage(
          error.response.data.detail || "Error during adding items."
        );
      } else {
        setAlertMessage("Error during adding items. Please try again.");
      }
      setAlertVariant("danger");
      setShow(true);
      console.error("Error during adding item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mb-5">
        Welcome {user.username} from {user.branch}
      </h2>
      {show && (
        <Alert
          className="mb-2"
          variant={alertVariant}
          onClose={() => setShow(false)}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}
      <Row>
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
                  <tr key={item.id || item.name}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        onChange={() => handleSelectItem(item.id)}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.branch}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {!loading ? (
              <Button
                variant="primary"
                type="button"
                onClick={handleAddItems}
                disabled={selectedItems.length === 0}
                className="w-100"
              >
                Add Items
              </Button>
            ) : (
              <Button
                variant="primary"
                type="button"
                disabled
                className="w-100"
              >
                Adding Items...
              </Button>
            )}
          </Form>
        </Col>
        <Col md={6}>
          <h4>Current Branch Menu</h4>
          <ListGroup>
            {currentBranchItems.map((item) => (
              <ListGroup.Item key={item.id || item.name}>
                {item.name} <br /> {item.price}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ItemsToAdd;
