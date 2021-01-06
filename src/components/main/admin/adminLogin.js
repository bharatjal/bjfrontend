import React from "react";
import { browserHistory } from "react-router";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify"
export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "Admin",
      password: "12345",
      token: "",
      loading: false,
    };
  }

  login = () => {
    this.setState({ loading: true });
    const url = "https://bharatjaldispenser.herokuapp.com/user/login";
    fetch(url, {
      method: "GET",
      headers: {
        Authorization:
          "Basic " + btoa(this.state.username + ":" + this.state.password),
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson.token);
        this.setState({ token: responseJson.token });
      })
      .then(() => {
        if (this.state.token != "") {
          localStorage.setItem("token", this.state.token);
          this.props.history.push({
            pathname: "/dashboard",
            state: {
              token: this.state.token,
            },
          });
          this.setState({ loading: false });
        } else {
          toast.error("Something is not right please try again");
        }
        toast.success("You have successfully logged in");
      })
      .catch((error) => {
        console.log(error + "  getting an error in getting the data");
      });
  };

  render() {
    return (
      <Container className="my-sm-5 my-2">
        <Row>
          <Col md={{ span: 4, offset: 4 }} md={{ span: 6, offset: 3 }}>
            <Card>
              <Card.Header as="h1">
                Login
                <Card.Title className="text-muted mt-1">
                  Admin Console
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={this.state.username}
                      onChange={(e) =>
                        this.setState({ username: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
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
                    onClick={this.login}
                    disabled={this.state.loading}
                  >
                    {this.state.loading && (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    {this.state.loading && <span>Signing In</span>}
                    {!this.state.loading && <span>Sign In</span>}
                  </Button>
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted text-center">
                <Row>
                  <Col>
                    <Link to="/">Home</Link>
                  </Col>
                  <Col className="text-sm-right" sm={{ span: 8 }}>
                    <Link to="/driver-console">Login into Driver Console</Link>
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
