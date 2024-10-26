import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Logo from "./logo.png";

const Login = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://durgamenu.onrender.com/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: inputUsername,
          password: inputPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(result));
        localStorage.setItem("token", result.access); // Store the access token
        navigate("/items-to-add");
        setShow(false);
      } else {
        console.log("Login failed:", result);
        setShow(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setShow(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#000026", minHeight: "100vh" }}>
      <div className="logo-container">
        <img src={Logo} alt="logo" className="logo" />
      </div>
      <div className="sign-in__wrapper">
        <div className="sign-in__backdrop"></div>
        <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
          <div className="h4 mb-2 text-center">Log In</div>
          {show && (
            <Alert
              className="mb-2"
              variant="danger"
              onClose={() => setShow(false)}
              dismissible
            >
              Incorrect username or password.
            </Alert>
          )}
          <Form.Group className="mb-2" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={inputUsername}
              placeholder="Username"
              onChange={(e) => setInputUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={inputPassword}
              placeholder="Password"
              onChange={(e) => setInputPassword(e.target.value)}
              required
            />
          </Form.Group>
          {!loading ? (
            <Button className="w-100" variant="primary" type="submit">
              Log In
            </Button>
          ) : (
            <Button className="w-100" variant="primary" type="submit" disabled>
              Logging In...
            </Button>
          )}
        </Form>
        <div
          style={{ backgroundColor: "#000026" }}
          className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center"
        >
          <h3>वचन कॉफीच 1987 पासुनच!☕</h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
