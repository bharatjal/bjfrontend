import React from "react";
import AdminLayout from "./AdminLayout";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
export default class UpdateDriver extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: "",
      name: "",
      email: "",
      password: "",
      loading: false,
    };
  }

  componentWillMount = () => {
    //let tokens = this.props.location.state.token
    let localdata = localStorage.getItem("token");
    if (!localdata) {
      this.props.history.push("/");
      alert("You are not logged in");
    }
    this.setState({ token: localdata });
  };

  submit = () => {
    this.setState({ loading: true });
    console.log(this.state);
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
        alert(JSON.stringify(response.message));
      })
      .then(() => {
        this.props.history.push("/homepage");
        this.setState({ loading: false });
      })
      .catch((error) => {
        alert("Something went wrong please try again");
      });
  };

  render() {
    return (
      <AdminLayout>
        <Row>
          <Col md={{ span: 12 }}>
            <Card>
              <Card.Header>Add Driver</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form>
                    {/* <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="Driver Name"
                        value={this.state.name}
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        }
                      />
                    </Form.Group> */}
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        className="form-control"
                        placeholder="Driver Email"
                        value={this.state.email}
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                      />
                    </Form.Group>

                    <div className="text-right">
                      <Button
                        variant="primary"
                        type="button"
                        className="btn-sm"
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
                        {this.state.loading && (
                          <span> Creating New Driver</span>
                        )}
                        {!this.state.loading && <span> Create Driver</span>}
                      </Button>
                    </div>
                  </Form>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </AdminLayout>
    );
  }
}
