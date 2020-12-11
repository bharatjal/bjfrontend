import React from "react";
// import Header from "../../common/header";
// import SideBar from "../../common/sidebar";
import { Link } from "react-router-dom";

export default class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: "",
      transId: "",
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
    this.setState({ transId: deviceData });
    console.log(
      deviceData +
        "   ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt"
    );
  };

  componentDidMount = () => {
    let x = this.state.token;
    console.log(x);
    const url =
      "https://bharatjaldispenser.herokuapp.com/transaction/" +
      this.state.transId;
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
      })
      .catch((error) => {
        console.log(
          error + "   This is error.................................."
        );
      });
  };

  delete = (device_id) => {
    const url =
      "https://bharatjaldispenser.herokuapp.com/device/delete/" + device_id;
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
          <td>{dta.trans_id}</td>
          <td>{dta.device_name}</td>
          <td>{dta.location}</td>
          <td>{dta.price}</td>
          <td>{dta.quantity_sold}</td>
        </tr>
      );
    };
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            {/* <SideBar /> */}
            <div className="col-10 dashboard_right">
              <div className="add_Member">
                <h2>Transaction Detail</h2>
              </div>
              <div className="dashboard_padding">
                {/* <Header /> */}

                <form>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Transaction ID</th>
                        <th scope="col">Device Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity sold</th>
                      </tr>
                    </thead>
                    <tbody>{allData()}</tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document"></div>
        </div>
      </div>
    );
  }
}
