import React from "react";
import AdminLayout from "./AdminLayout";

export default class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: "",
      deviceId: "",
      deliveryId: "",
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
    this.setState({ token: localdata, deliveryId: did });
  };

  componentDidMount = () => {
    let x = this.state.token;
    console.log(x);
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url =
      "https://bharatjaldispenser.herokuapp.com/delivery/" +
      this.state.deliveryId;
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
        this.setState({ data: responseJson.delivery });
      })
      .catch((error) => {
        console.log(error + "  getting an error in getting the data");
      });
  };

  delete = (device_id) => {
    const url =
      "http://bharatjaldispenser.herokuapp.com/delivery/delete/" + device_id;
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
    console.log(JSON.stringify(deviceData) + "  : Device data available");
    let allData = deviceData.map((dta) => {
      return (
        <tr>
          <td>{dta.driver_name}</td>
          <td>{dta.driver_email}</td>
          <td>{dta.id}</td>
          <td>{dta.location}</td>
          <td>{dta.temp}</td>
          <td>{dta.amount}</td>
          <td>{dta.timestamp}</td>
          <td>
            <button onClick={() => this.delete(dta.id)}>Delete</button>
            <br />
          </td>
        </tr>
      );
    });
    return (
      <AdminLayout>
        <div className="row">
          {/* <SideBar /> */}
          <div className="col-10 dashboard_right">
            <div className="add_Member">
              <h2>Delivery Detail</h2>
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
                      <th scope="col">Location</th>
                      <th scope="col">Temperature</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Delivered On</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>{allData}</tbody>
                </table>
              </form>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }
}
