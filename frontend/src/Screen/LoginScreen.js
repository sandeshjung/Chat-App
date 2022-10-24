import { React, useState } from "react";
import { Container, Col, Row, Button, Form, Image } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <Row className="py-5 justify-content-md-center">
        <Col md={6}>
          <Image
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            fluid
            alt="Phone"
          />
        </Col>
        <Col md={1} />
        <Col md={4} className="py-5 ">
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Sign In
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default LoginScreen;
