import React from "react";
import AdminLayout from "./AdminLayout";
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import { Spinner } from "react-bootstrap"
import { toast } from "react-toastify"
export default class Homepage extends React.Component {
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
      toast.error("You are not logged in");
    }
    this.setState({ token: localdata });
  };

  componentDidMount = () => {
    this.getDriverData();
  };

  getDriverData = () => {
    let x = this.state.token;
    //console.log(x)
    const url = "https://bharatjaldispenser.herokuapp.com/driver/all";
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
        this.setState({ loading: false })
        this.setState({ data: responseJson.driver });
      })
      .catch((error) => {
        this.setState({ loading: false })
        console.log(error + "  getting an error in getting the data");
      });
  };

  delete = (driver_id) => {
    this.setState({ loading: true });
    let x = this.state.token;

    let did = driver_id;
    const url = "https://bharatjaldispenser.herokuapp.com/driver/delete/" + did;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": x,
      },
    })
      .then((responseJson) => responseJson.json())
      .then((res) => {
        console.log(JSON.stringify(res));
      })
      .then(() => {
        toast.success("Data Successfully deleted");
        this.getDriverData();
        this.setState({ loading: false });
      })
      .catch((fail) => {
        toast.error(JSON.stringify(fail));
      });
  };

  render() {
    const { SearchBar } = Search;
    const columns = [
      {
        dataField: 'id',
        text: 'Driver ID',
        sort: true
      },
      {
        dataField: 'vehicle_num',
        text: 'Vehicle No.',
        sort: true
      },
      {
        dataField: 'name',
        text: 'Driver Name',
        sort: true,
      },

      {
        dataField: 'email',
        text: 'Email'
      },
      {
        dataField: 'aadhar_num',
        text: 'UIDAI',
      },
      {
        dataField: 'created',
        text: 'Created On	',
        sort: true
      },
      {
        dataField: 'actions',
        text: 'Actions',
        isDummyField: true,
        csvExport: false,
        formatter: (email, row) => {
          return (
            <>
              <Link
                className="btn btn-info btn-sm mr-1"
                to={`driverDetail/${row.email}`}
                disabled={this.state.loading}
              >
                Detail
            </Link>
            </>
          )
        }
      },
    ];
    let driverData = this.state.data;

    return (
      <AdminLayout>
        {  this.state.loading ?
          <div className="d-flex align-items-center justify-content-center spinnerCont">
            <Spinner animation="border" variant="info" classame="spinner" />
          </div>
          :
          <ToolkitProvider
            keyField="id"
            data={driverData}
            columns={columns}

            striped bootstrap4

            search
          >
            {
              props => (
                <>
                  <Row>
                    <Col sm={6}>
                      <h2>Drivers</h2>
                    </Col>
                    <Col sm={6} className='text-right'>
                      <SearchBar {...props.searchProps} />
                      <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button mx-2 btn-primary"
                        table="table-to-xls"
                        filename="Drivers"
                        sheet="Drivers"
                        buttonText="Download as XLS" />
                    </Col>
                    <hr />
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <BootstrapTable

                        id="table-to-xls"
                        {...props.baseProps}
                      />
                    </Col>
                  </Row>
                </>
              )
            }
          </ToolkitProvider>
        }
      </AdminLayout>
    );
  }
}
