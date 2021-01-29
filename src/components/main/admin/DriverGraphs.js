import React from 'react'
import AdminLayout from "./AdminLayout";
import { Link } from 'react-router-dom'
import Card from "react-bootstrap/Card";
import { Doughnut, Bar, Line, Pie, Radar, Polar } from "react-chartjs-2";
import DriverGraph from "./DriverGraph"
import { Row, Col } from "react-bootstrap"
export default class DriverGraphs extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            dataItem: [],
            token: "",
            loading: false,
            arrayItem: [120, 11, 10, 10, 11, 10, 10, 10, 10, 10, 10, 20]
        };
    }
    componentWillMount = () => {
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

    render() {
        return (
            <AdminLayout>
                <Row>
                    <Col>
                        <DriverGraph arrayItem={this.state.arrayItem} />
                    </Col>
                    {/* <Col>
                        <DriverGraph arrayItem={this.state.arrayItem} />
                    </Col> */}
                </Row>
            </AdminLayout>
        )
    }
}