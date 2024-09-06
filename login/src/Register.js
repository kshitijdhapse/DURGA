import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Logo from "./logo.png";

const Register = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputBranch, setInputBranch] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Sending the POST request to the backend
    try {
      const response = await fetch("http://127.0.0.1:8000/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: inputUsername,
          password: inputPassword,
          branch: inputBranch,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Handle successful login
        // console.log("Login successful:", result);
        // localStorage.setItem("user", JSON.stringify(result));
        <Alert
          className="mb-2"
          variant="success"
          onClose={() => setShow(false)}
          dismissible
        >
          User registered Successfully!
        </Alert>;
        navigate("/");
        setShow(false); // Hide the alert if login is successful
      } else {
        // Handle login error (e.g., invalid credentials)
        console.log("Registration failed:", result);
        setShow(true); // Show the alert
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setShow(true);
    }

    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: "#000026", minHeight: "100vh" }}>
      <div className="logo-container">
        <img src={Logo} alt="logo" className="logo" />
      </div>
      <div className="sign-in__wrapper">
        <div className="sign-in__backdrop"></div>
        <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
          <div className="h4 mb-2 text-center">Register</div>
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
          <Form.Group className="mb-2" controlId="username">
            <Form.Label>Branch</Form.Label>
            <Form.Control
              type="text"
              value={inputBranch}
              placeholder="Branch"
              onChange={(e) => setInputBranch(e.target.value)}
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
              Register
            </Button>
          ) : (
            <Button className="w-100" variant="primary" type="submit" disabled>
              Registering...
            </Button>
          )}
        </Form>
        <br></br>
        <h6
          style={{ cursor: "pointer" }}
          className="text-white"
          onClick={navigate("/")}
        >
          Already Registered? Log In
        </h6>
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

export default Register;
