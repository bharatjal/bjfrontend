import React, { useEffect , useState } from "react";
import AdminLayout from "../main/admin/AdminLayout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import AnalyticDoughnut from "../partials/AnalyticDoughnut";
import AnalyticPie from "../partials/AnalyticPie";
import AnalyticRadar from "../partials/AnalyticPolar";
import AnalyticBar from "../partials/AnalyticBar";
import AnalyticLine from "../partials/AnalyticLine";
import { useHistory } from "react-router-dom"
import DriverGraph from "../main/admin/DriverGraph"

export default function Dashboard(props) {
  const history = useHistory()
  const [labels, labelsUpdate] = useState([])
  const [data, dataUpdate] = useState([])
  const [dataAmount, dataAmountUpdate] = useState([])
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push('/')
    }
  }, [])
  useEffect(() => {

    let x = localStorage.getItem('token');
    console.log(x);
    const url = "http://3.108.223.75/delivery/sum";

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
        labelsUpdate(responseJson.deliveries.map((i,index)=>{
            return i.driver_name
        }));
        dataUpdate(responseJson.deliveries.map((i,index)=>{
          return i.sum_of_amount
        }));
        dataAmountUpdate(responseJson.deliveries.map((i,index)=>{
          return i.sum_of_ltrs
        }));
      })
      .catch((error) => {
        console.log(error + "  getting an error in getting the data");
      });

  }, [])
  return (
    <AdminLayout>
      <Row className="mb-4">
        <Col>
          <AnalyticDoughnut />
          {/* <DriverGraph/> */}
        </Col>
        <Col>
          <AnalyticPie />
        </Col>
        {/* <Col md={{ span: 4 }}>
          <AnalyticRadar />
        </Col> */}
      </Row>

      <Row>
        <Col md={{ span: 6 }}>
          {/* <AnalyticLine /> */}
          <AnalyticBar topHead="Annual Water Dispensed (2021)" head="In Litres" labels={labels} data={dataAmount} />
        </Col>

        <Col md={{ span: 6 }}>
          <AnalyticBar topHead="Annual Revenue (2021)" head ="Sum Of Amount in Rs." labels={labels} data={data} />
        </Col>
      </Row>
    </AdminLayout>
  );
}
