import React from "react";
import AdminLayout from "./AdminLayout";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Moment from 'react-moment';
// import Header from "../../common/header";
// import Table from "react-bootstrap/Table";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Spinner } from "react-bootstrap";

import filterFactory, {
  textFilter,
  FILTER_TYPES,
  dateFilter,
  Comparator,
  customFilter,
} from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";

// function headerColFormat(column, colIndex) {
//   return (
//     <span>{ column.text }<br/></span>
//   );
// }

export default class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: "",
      loading: false,
      // modalToggle: false,
    };
  }
  // handleModalToggle() {
  //   this.setState({ modalToggle: !this.state.modalToggle });
  // }

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
    const url = "http://bharatjaldispenser.herokuapp.com/delivery/all";
    // const url = "https://bharatjaldispenser.herokuapp.com/delivery/daily";
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
      .then(
        (responseJson) => {
          this.setState({ loading: false })
          this.setState({ data: responseJson?.deliveries });
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
    const url =
      "http://bharatjaldispenser.herokuapp.com/driver/delete/" + device_id;
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
    const { SearchBar } = Search;
    const columns = [
      {
        dataField: "date",
        text: "Date",
        sort: true,
        filter: dateFilter({
          withoutEmptyComparatorOption: true,
          comparators: [Comparator.EQ],
          comparatorClassName: "d-none",
          style: { display: "inline-grid" },
          id: "id",
        }),
      },
      {
        dataField: "time",
        text: "Time",
        sort: true,
      },
      {
        dataField: "locality",
        text: "Sale Point Location",
        isDummyField: true,
        filter: textFilter(),
        formatter: (col, row) => {
          return (
            <>
              {row.locality},{row.address}
            </>
          );
        },
      },
      {
        dataField: "d_vehicle_num",
        text: "Vehicle Number",
        filter: textFilter(),
        sort: true,
      },
      {
        dataField: "driver_name",
        text: "Name",
        sort: true,
        filter: textFilter(),
      },
      {
        dataField: "driver_email",
        text: "Email",
        sort: true,
        filter: textFilter(),
      },
      {
        dataField: "thmlunit",
        // headerFormatter: headerColFormat,
        text: "Nimbu Pani (Unit) / 200ML",
        sort: true,
      },
      {
        dataField: "tfmlunit",
        text: "GLasses (Unit) / 250ML",
        sort: true,
      },
      {
        dataField: "fhmlunit",
        text: "Bottle (Unit) / 500ML",
        sort: true,
      },
      {
        dataField: "olunit",
        text: "Bottle (Unit) / 1L",
        sort: true,
      },
      {
        dataField: "tds",
        text: "TDS",
        sort: true,
      },
      {
        dataField: "temp",
        text: "Temperature",
        sort: true,
      },
      {
        dataField: "thmlltrs",
        text: "Nimbu Pani (Ltrs.) / 200ML",
        sort: true,
      },
      {
        dataField: "tfmlltrs",
        text: "GLasses (Ltrs.) / 250ML",
        sort: true,
      },
      {
        dataField: "fhmlltrs",
        text: "Bottle (Ltrs.) / 500ML",
        sort: true,
      },
      {
        dataField: "olltrs",
        text: "Bottle (Ltrs.) / 1L",
        sort: true,
      },
      {
        dataField: "sum_of_ltrs",
        text: "Sum of Ltrs",
        sort: true,
      },
      {
        dataField: "sum_of_amount",
        text: "Sum of Amount",
        sort: true,
      },
      {
        dataField: "incentive",
        text: "Incentive",
        sort: true,
      },
      {
        dataField: "limitltrs",
        text: "Limit Ltrs	",
        sort: true,
      },
      {
        dataField: "warning",
        text: "Warning",
        sort: true,
      },

      {
        dataField: "location",
        text: "Last GPRS Location",
        isDummyField: true,
        formatter: (col, row) => {
          return (
            <>
              <a
                href={`https://www.google.com/maps/place/${row.location}/@28.577813,77.0582406,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d28.577813!4d77.0582406`}
                rel="noopener"
                target="_blank"
              >
                {row.location}
              </a>
            </>
          );
        },
      },
    ];
    let deviceData = this.state.data;
    return (
      <AdminLayout>
        {  this.state.loading ?
          <div className="d-flex align-items-center justify-content-center spinnerCont">
            <Spinner animation="border" variant="info" classame="spinner" />
          </div>
          :
          <ToolkitProvider
            keyField="id"
            data={deviceData}
            columns={columns}
            bootstrap4
            striped
            search
          >
            {(props) => (
              <>
                <Row>
                  <Col sm={6}>
                    <h2>Realtime Deliveries Tracking</h2>
                  </Col>
                  <Col sm={6} className="text-right">
                    <SearchBar {...props.searchProps} />

                    <ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      className="download-table-xls-button mx-2 btn-primary"
                      table="table-to-xls-all-data"
                      filename="All Deliveries"
                      sheet="All Deliveries"
                      buttonText="Download as XLS"
                    />
                  </Col>
                  <hr />
                </Row>
                <Row>
                  <Col sm={12} className="isTable">
                    <BootstrapTable
                      id="table-to-xls-all-data"
                      keyField="id"
                      filter={filterFactory()}
                      // filterPosition="top"
                      pagination={paginationFactory({
                        showTotal: true,
                      })}
                      {...props.baseProps}
                    />
                  </Col>
                </Row>
              </>
            )}
          </ToolkitProvider>
        }
        {/* <Modal dialogClassName="w-100" show={this.state.modalToggle} onEscapeKeyDown={this.setState.modalToggle}>
          <Modal.Header closeButton onClick={() => this.handleModalToggle()}>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.handleModalToggle()}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal> */}
      </AdminLayout>
    );
  }
}
