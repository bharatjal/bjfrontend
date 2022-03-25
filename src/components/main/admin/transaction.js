import React from "react";
import Header from "../../common/header";
import AdminLayout from "./AdminLayout";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
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

  componentDidMount = () => {
    let x = this.state.token;
    console.log(x);
    const url = "http://3.108.223.75/transaction/all";
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application.json",
        "x-access-token": this.state.token,
      },
    })
      .then((responseJson) => responseJson.json())
      .then((response) => {
        this.setState({ data: response });
        console.log(
          JSON.stringify(response) + "   xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        );
      })
      .catch((error) => {
        console.log(
          error + "   This is error.................................."
        );
      });
  };

  delete = (device_id) => {
    const url =
      "http://3.108.223.75/device/delete/" + device_id;
    fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application.json",
        "x-access-token": this.state.token,
      },
    })
      .then((responseJson) => responseJson.json())
      .then((response) => {
        alert(response);
      })
      .catch((error) => {
        console.log(
          error + "   This is error.................................."
        );
      });
  };

  render() {
    let deviceData = this.state.data;
    let allData = deviceData.map((dta) => {
      return (
        <tr key={dta.id}>
          <td>{dta.trans_id}</td>
          <td>{dta.device_name}</td>
          <td>{dta.location}</td>
          <td>{dta.price}</td>
          <td>{dta.quantity_sold}</td>

          <td>
            <Link
              to={{
                pathname: "/transactionDetail",
                state: { id: dta.trans_id },
              }}
            >
              Detail
            </Link>
          </td>
        </tr>
      );
    });
    return (
      <AdminLayout>
        <Row>
          <Col md={{ span: 5 }}>
            <h2>Realtime Deliveries Tracking</h2>
          </Col>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover size="sm" responsive="sm">
              <thead>
                <tr>
                  <th scope="col">Transaction ID</th>
                  <th scope="col">Device Name</th>
                  <th scope="col">Location</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity sold</th>

                  <th scope="col">Detail</th>
                </tr>
              </thead>
              <tbody>{allData}</tbody>
            </Table>
          </Col>
        </Row>
      </AdminLayout>
    );
  }
}
