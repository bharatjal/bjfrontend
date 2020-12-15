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
    //console.log(x)
    const url = "http://bharatjaldispenser.herokuapp.com/fillup/all";
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
        //console.log(JSON.stringify(response)+'   xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
      })
      .catch((error) => {
        console.log(
          error + "   This is error.................................."
        );
      });
  };

  delete = (device_id) => {
    const url =
      "http://bharatjaldispenser.herokuapp.com/device/delete/" + device_id;
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
          <td>{dta.fillup_id}</td>
          <td>{dta.device_name}</td>
          <td>{dta.location}</td>

          <td>
            <button>
              <Link
                to={{ pathname: "/fillupDetail", state: { id: dta.fillup_id } }}
              >
                Detail
              </Link>
            </button>
            <br />
          </td>
        </tr>
      );
    });
    return (
      <AdminLayout>
        <Row>
          <Col md={{ span: 5 }}>
            <h2>Fillups Listing</h2>
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
                  <th scope="col">Fillup ID</th>
                  <th scope="col">Device Name</th>
                  <th scope="col">Location</th>

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
