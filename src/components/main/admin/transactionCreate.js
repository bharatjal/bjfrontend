import React from "react";
import Header from "../../common/header";
import AdminLayout from "./AdminLayout";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default class UpdateDevice extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      deviceName: "",
      price: "",
      qtySold: "",
      location: "",
      token: "",
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
    const url = "https://bharatjaldispenser.herokuapp.com/transaction/create";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/josn",
        "Content-Type": "application/json",
        "x-access-token": this.state.token,
      },
      body: JSON.stringify({
        device_name: this.state.deviceName,
        price: this.state.price,
        qty_sold: this.state.qtySold,
        location: this.state.location,
      }),
    })
      .then((responseJson) => responseJson.json())
      .then((response) => {
        console.log(JSON.stringify(response));
        alert(JSON.stringify(response));
      })
      .then(() => {
        this.props.history.push("/transaction");
      })
      .catch((error) => {
        console.log(error + "   4444444444444444444444444444");
        alert(error);
      });
  };

  render() {
    return (
      <AdminLayout>
        <Row>
          <Col md={{ span: 5 }}>

            <h2>Create Transaction</h2>
          </Col>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 12 }}>
            <Card>
              <Card.Body>
                <Card.Text>
                  <Form.Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Device name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter device name"
                          value={this.state.deviceName}
                          onChange={(e) =>
                            this.setState({ deviceName: e.target.value })
                          }
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Price"
                          value={this.state.price}
                          onChange={(e) =>
                            this.setState({ price: e.target.value })
                          }
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Quantity sold</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Quantity sold"
                          value={this.state.qtySold}
                          onChange={(e) =>
                            this.setState({ qtySold: e.target.value })
                          }
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Location"
                          value={this.state.location}
                          onChange={(e) =>
                            this.setState({ location: e.target.value })
                          }
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Form.Row>

                  <div className="text-right">
                    <Button
                      type="submit"
                      variant="primary"
                      // block
                      onClick={this.submit}
                      disabled={this.state.loading}
                    >
                      Create
                    </Button>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </AdminLayout>
    );
  }
}
