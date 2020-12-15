import React from "react";
import AdminLayout from "./AdminLayout";
import { Link } from "react-router-dom";

export default class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: "",
      fillupId: "",
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

    let deviceData = this.props.location.state.id;
    this.setState({ fillupId: deviceData });
    console.log(
      deviceData +
        "   000000000000000000000000000000000000000000000000000000000000000"
    );
  };

  componentDidMount = () => {
    let x = this.state.token;
    //console.log(x)
    const url =
      "http://bharatjaldispenser.herokuapp.com/fillup/" + this.state.fillupId;
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
    let dta = this.state.data;
    console.log(dta.location + "  0555555555555555555555555555555555555");
    let allData = function () {
      return (
        <tr>
          <td>{dta.fillup_id}</td>
          <td>{dta.device_name}</td>
          <td>{dta.location}</td>
        </tr>
      );
    };
    return (
      <AdminLayout>
        <div className="container-fluid">
          <div className="row">
            {/* <SideBar /> */}
            <div className="col-10 dashboard_right">
              <div className="add_Member">
                <h2>Fillup Detail</h2>
              </div>
              <div className="dashboard_padding">
                {/* <Header /> */}

                <form>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Fillup ID</th>
                        <th scope="col">Device Name</th>
                        <th scope="col">Location</th>
                      </tr>
                    </thead>
                    <tbody>{allData()}</tbody>
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
