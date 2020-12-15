import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default class FrontPage extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  submit = () => {
    this.setState({ loading: true });
    let url = "https://bharatjaldispenser.herokuapp.com/driver/create";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((responseJson) => responseJson.json())
      .then((response) => {
        alert(JSON.stringify(response));
      })
      .then(() => {
        this.props.history.push("/driver-console");
        this.setState({ loading: false });
      })
      .catch((error) => {
        alert("Something went wrong please try again");
      });
  };

  render() {
    return (
      <Container className="my-sm-5 my-2">
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Card>
              <Card.Header as="h1">
                Register
                <Card.Title className="text-muted mt-1">
                  Driver Console
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter full name"
                      value={this.state.name}
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter email"
                      value={this.state.password}
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    block
                    onClick={this.submit}
                    disabled={this.state.loading}
                  >
                    {this.state.loading && (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    {this.state.loading && <span> Creating Account</span>}
                    {!this.state.loading && <span> CREATE ACCOUNT</span>}
                  </Button>
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted text-center">
                <Row>
                  <Col>
                    <Link to="/">Home</Link>
                  </Col>
                  <Col className="text-sm-right" sm={{ span: 8 }}>
                    Already registered?
                    <Link to="/driver-console" id="custom-link">
                      {" "}
                      Login
                    </Link>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
