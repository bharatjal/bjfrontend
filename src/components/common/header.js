import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
export default class Header extends Component {
  //   logout = () => {
  //     localStorage.clear();
  //   };

  render() {
    return (
      <Container fluid className="my-2">
        <Row>
          <Col md={{ span: 6, offset: 6 }} className="position-relative">
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Search Your Keyword Here"
              />
            </Form.Group>

            <Button
              variant="primary"
              size="small"
              className="position-absolute"
              style={{ right: 15, top: 0 }}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
