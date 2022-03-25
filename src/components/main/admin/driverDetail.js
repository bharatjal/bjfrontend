import React from "react";
import AdminLayout from "./AdminLayout";
import { Link } from "react-router-dom";

export default class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: "",
      driverId: "",
      email: "",
      loading: false,
    };
  }

  componentWillMount = () => {
    //let tokens = this.props.location.state.token
    let did = this.props.match.params.id;
    console.log("8888888888888888888888888" + did);
    let localdata = localStorage.getItem("token");
    if (!localdata) {
      this.props.history.push("/");
      alert("You are not logged in");
    }
    this.setState({ token: localdata, email: did });
  };

  componentDidMount = () => {
    let x = this.state.token;
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url =
      "http://3.108.223.75/driver/" + this.state.email;
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

        console.log(responseJson.driver);
        this.setState({ data: responseJson.driver });
      })
      .catch((error) => {
        console.log(error + "  getting an error in getting the data");
      });
  };

  delete = (driver_id) => {
    this.setState({ loading: true });
    const url =
      "http://3.108.223.75/driver/delete/" + driver_id;
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
        alert(response.message);
        this.setState({ loading: false });
      })
      .then(() => {
        this.props.history.push("/homepage");
      })
      .catch((error) => {
        console.log(
          error + "   This is error.................................."
        );
      });
  };

  render() {
    let driverData = this.state.data;
    console.log(JSON.stringify(driverData) + "  : Driver data available");
    let allData = driverData.map((dta) => {
      return (
        <tr key={dta.id}>
          <td>{dta.name}</td>
          <td>{dta.email}</td>
          <td>{dta.id}</td>
          <td>{dta.vehicle_num}</td>
          <td>{dta.aadhar_num}</td>
          <td>{dta.created}</td>
          <td>
            <Link
              className="btn btn-info btn-sm mr-1"
              to={{ pathname: `/driverUpdate/${this.state.email}`, state: { dta: dta } }}
              disabled={this.state.loading}
            >
              Update
            </Link>

            <button
              className="btn btn-danger btn-sm mr-1"
              onClick={() => this.delete(dta.id)}
              disabled={this.state.loading}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return (
      <AdminLayout>
        <div className="container-fluid">
          <div className="row">
            {/* <SideBar /> */}
            <div className="col-12 dashboard_right">
              <div className="add_Member">
                <h2>Driver Detail</h2>
              </div>
              <div className="dashboard_padding">
                {/* <Header /> */}

                <form>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Driver Name</th>
                        <th scope="col">Driver Email</th>
                        <th scope="col">Driver Id</th>
                        <th scope="col">Vehicle no</th>
                        <th scope="col">Driver Adhaar</th>
                        <th scope="col">Created On</th>
                        <th scope="col" colSpan='2'> Action</th>
                      </tr>
                    </thead>
                    <tbody>{allData}</tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }
}
