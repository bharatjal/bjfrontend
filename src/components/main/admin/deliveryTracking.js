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
    // console.log(x)
    const url = "https://bharatjaldispenser.herokuapp.com/delivery/realtime/all";
    setInterval(() => {
      fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application.json",
          "x-access-token": x,
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log(responseJson)
          this.setState({ data: responseJson.deliveries });
        })
        .catch((error) => {
          console.log(error + "  getting an error in getting the data");
        });
    }, 10000);
  };

  delete = (device_id) => {
    alert(JSON.stringify(device_id));
    let x = this.state.token;
    const url =
      "https://bharatjaldispenser.herokuapp.com/driver/delete/" + device_id;
    fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application.json",
        "x-access-token": x,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(
          JSON.stringify(responseJson) + "successfully deleted........"
        );
        alert("successfully deleted........");
      })
      .catch((error) => {
        console.log(
          JSON.stringify(error) + "  Error in getting the data"
        );
      });
  };

  render() {
    let deviceData = this.state.data;
    let allData = deviceData.map((dta) => {
      console.log(dta);
      if (dta.amount != 0) {
        return (
          <tr key={dta.id}>
            <td>{dta.date}</td>
            <td>{dta.time}</td>
            <td>{dta.driver_name}</td>
            <td>{dta.r_vehicle_num}</td>
            <td className='text-center'>{dta.thmlunit}</td>
            <td className='text-center'>{dta.tfmlunit}</td>
            <td className='text-center'>{dta.fhmlunit}</td>
            <td className='text-center'>{dta.olunit}</td>

            <td>
              <Link
                className="btn btn-info btn-sm mr-1"
                to={`deliveryDetail/${dta.id}`}
                disabled={this.state.loading}
              >
                Detail
              </Link>
            </td>
          </tr>
        );
      }
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
        <Row className='deliveriesTbl'>
          <Col>
            <Table striped bordered hover size="sm" responsive="sm">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Driver Name</th>
                  <th scope="col">Vehicle No.</th>

                  <th scope="col" className='text-center'><span>Nimbu Pani (Unit)</span>200ML</th>
                  <th scope="col" className='text-center'><span>GLasses (Unit)</span>250ML</th>
                  <th scope="col" className='text-center'><span>Bottle (Unit)</span>500ML</th>
                  <th scope="col" className='text-center'><span>Bottle (Unit)</span>1L</th>
                  <th scope="col">Action</th>
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
