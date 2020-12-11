import React from "react";
import AdminLayout from "./AdminLayout";
// import { Link } from "react-router-dom";
import Header from "../../common/header";
import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Spinner } from "react-bootstrap"

export default class DeliveriesSum extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: "",
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

  componentDidMount = () => {
    let x = this.state.token;
    console.log(x);
    const url = "https://bharatjaldispenser.herokuapp.com/delivery/sum";
    this.setState({ loading: true })

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
        console.log(responseJson);
        this.setState({ loading: false })
        this.setState({ data: responseJson.deliveries });
      })
      .catch((error) => {
        this.setState({ loading: false })
        console.log(error + "  getting an error in getting the data");
      });
  };

  delete = (device_id) => {
    this.setState({ loading: true });

    //alert(JSON.stringify(device_id))
    let x = this.state.token;
    const url = "https://bharatjaldispenser.herokuapp.com/driver/delete/" + device_id;
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
        alert(responseJson.message);
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(
          JSON.stringify(error) + "  getting an error in getting the data"
        );
      });
  };

  render() {
    let deviceData = this.state.data;

    let allData = deviceData?.map((dta) => {
      if (dta.amount != 0) {
        return (
          <tr key={dta.id}>
            <td>{dta.id}</td>
            <td>{dta.d_vehicle_num}</td>
            <td>
              {dta.driver_name} <br />
              <small>{dta.driver_email}</small>
            </td>

            <td className='text-center'>{dta.thmlunit}</td>
            <td className='text-center'>{dta.tfmlunit}</td>
            <td className='text-center'>{dta.fhmlunit}</td>
            <td className='text-center'>{dta.olunit}</td>

            <td className='text-center'>{Number(dta.thmlltrs).toFixed(2)}</td>
            <td className='text-center'>{Number(dta.tfmlltrs).toFixed(2)}</td>
            <td className='text-center'>{Number(dta.fhmlltrs).toFixed(2)}</td>
            <td className='text-center'>{Number(dta.olltrs).toFixed(2)}</td>

            <td>{Number(dta.sum_of_ltrs).toFixed(2)}</td>
            <td>{dta.sum_of_amount}</td>
            <td>{dta.incentive}</td>
          </tr>
        );
      }
    });
    return (
      <AdminLayout>
        {     this.state.loading ?
          <div className="d-flex align-items-center justify-content-center spinnerCont">
            <Spinner animation="border" variant="info" classame="spinner" />
          </div>
          :
          <>
            <Row>
              <Col md={{ span: 5 }}>
                <h2>Deliveries Sum</h2>
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-xls-button"
                  table="table-to-xls"
                  filename="Drivers"
                  sheet="Drivers"
                  buttonText="Download as XLS" />
              </Col>
              <Col>
                <Header />
              </Col>
            </Row>
            <Row className='deliveriesTbl'>
              <Col>
                <Table striped bordered hover size="sm" responsive id="table-to-xls">
                  <thead>
                    <tr>
                      <th scope="col" style={{ minWidth: 60 }}>S. No.</th>
                      <th scope="col">Vehicle Number</th>
                      <th scope="col">Driver Info</th>

                      <th scope="col" className='text-center'><span>Nimbu Pani (Unit)</span>200ML</th>
                      <th scope="col" className='text-center'><span>GLasses (Unit)</span>250ML</th>
                      <th scope="col" className='text-center'><span>Bottle (Unit)</span>500ML</th>
                      <th scope="col" className='text-center'><span>Bottle (Unit)</span>1L</th>

                      <th scope="col" className='text-center'><span>Nimbu Pani (Ltrs.)</span>200ML</th>
                      <th scope="col" className='text-center'><span>GLasses (Ltrs.)</span>250ML</th>
                      <th scope="col" className='text-center'><span>Bottle (Ltrs.)</span>500ML</th>
                      <th scope="col" className='text-center'><span>Bottle (Ltrs.)</span>1L</th>

                      <th scope="col">Sum of Ltrs</th>
                      <th scope="col">Sum of Amount</th>
                      <th scope="col">Incentive</th>
                    </tr>
                  </thead>
                  <tbody>{allData}</tbody>
                </Table>
              </Col>
            </Row>
          </>
        }
      </AdminLayout>
    );
  }
}
