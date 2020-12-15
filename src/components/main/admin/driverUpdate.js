import React from "react";
import AdminLayout from "./AdminLayout";

export default class Updatedriver extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      driverId: "",
      name: "",
      email: "",
      aadhaarNo: "",
      createdOn: "",
      regNo: "",
      token: "",
    };
  }

  componentWillMount = () => {
    let localdata = localStorage.getItem("token");
    if (!localdata) {
      this.props.history.push("/");
      alert("You are not logged in");
    }
    let data = this.props.location.state.dta;
    if (this.props.location.state.dta != undefined) {
      this.setState({
        name: data.driver_name,
        email: data.email,
        aadhaarNo: data.aadhar_num,
        createdOn: data.created,
        regNo: data.reg_num,
        driverId: data.id,
      });
      this.setState({ token: localdata });
    } else {
      this.props.history.push("/homepage");
      alert("something went wrong please try again");
    }

    console.log(
      JSON.stringify(data) +
        "   000000000000000000000000000000000000000000000000000000000000000"
    );
  };

  componentDidMount = () => {
    console.log(typeof this.state.name);
    console.log(typeof this.state.email);
    console.log(typeof this.state.regNo);
  };

  Update = () => {
    this.setState({ loading: true });
    let x = JSON.parse(this.state.driverId);
    const url = "https://bharatjaldispenser.herokuapp.com/driver/update/" + x;
    fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/josn",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        driver_name: this.state.name,
        aadhar_num: this.state.aadhaarNo,
        reg_num: this.state.regNo,
      }),
    })
      .then((responseJson) => responseJson.json())
      .then((response) => {
        console.log(JSON.stringify(response));
        alert(JSON.stringify(response.message));
      })
      .then(() => {
        this.props.history.push("/homepage");
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        this.props.history.push("/homepage");
        alert(JSON.stringify(error) + "  Updation failed please try again");
      });
  };

  render() {
    return (
      <AdminLayout>
        <div className="container-fluid">
          <div className="row">
            {/* <SideBar /> */}
            <div className="col-10 dashboard_right">
              <div className="add_Member">
                <h2>Update Driver Details</h2>
              </div>
              <div className="dashboard_padding">
                {/* <Header /> */}

                <div>
                  {/* <form className="needs-validation" > */}
                  <div className="form-row">
                    <div className="col-md-4 mb-3">
                      <label for="validationCustom01">
                        Driver Registration No
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="validationCustom01"
                        placeholder="Driver registration no"
                        value={this.state.regNo}
                        onChange={(e) =>
                          this.setState({ regNo: e.target.value })
                        }
                        required
                      />
                      <div className="valid-feedback">Looks good!</div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-4 mb-3">
                      <label for="validationCustom01">Registered On</label>
                      <input
                        type="text"
                        className="form-control"
                        id="validationCustom01"
                        placeholder="Registered on"
                        value={this.state.createdOn}
                        disabled
                      />
                      <div className="valid-feedback">Looks good!</div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-4 mb-3">
                      <label for="validationCustom01">Driver Email</label>
                      <input
                        type="text"
                        className="form-control"
                        id="validationCustom01"
                        placeholder="Driver email"
                        value={this.state.email}
                        disabled
                      />
                      <div className="valid-feedback">Looks good!</div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-4 mb-3">
                      <label for="validationCustom01">Driver name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="validationCustom01"
                        placeholder="Driver name"
                        value={this.state.name}
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        }
                        required
                      />
                      <div className="valid-feedback">Looks good!</div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-4 mb-3">
                      <label for="validationCustom01">Driver Aadhaar No</label>
                      <input
                        type="text"
                        className="form-control"
                        id="validationCustom01"
                        placeholder="Driver aadhaar"
                        value={this.state.aadhaarNo}
                        onChange={(e) =>
                          this.setState({ aadhaarNo: e.target.value })
                        }
                        required
                      />
                      <div className="valid-feedback">Looks good!</div>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={this.Update}
                    disabled={this.state.loading}
                  >
                    {this.state.loading && (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    {this.state.loading && <span>Updating details</span>}
                    {!this.state.loading && <span>Update</span>}
                  </button>
                  {/* </form>
                   */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }
}
