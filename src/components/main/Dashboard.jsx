import React, { useEffect } from "react";
import AdminLayout from "../main/admin/AdminLayout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import AnalyticDoughnut from "../partials/AnalyticDoughnut";
import AnalyticPie from "../partials/AnalyticPie";
import AnalyticRadar from "../partials/AnalyticPolar";
import AnalyticBar from "../partials/AnalyticBar";
import AnalyticLine from "../partials/AnalyticLine";
import { useHistory } from "react-router-dom"

export default function Dashboard(props) {
  const history = useHistory()
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push('/')
      // alert('You are not login.')
    }
  }, [])
  return (
    <AdminLayout>
      <Row className="mb-4">
        <Col md={{ span: 4 }}>
          <AnalyticDoughnut />
        </Col>
        <Col md={{ span: 4 }}>
          <AnalyticPie />
        </Col>
        <Col md={{ span: 4 }}>
          <AnalyticRadar />
        </Col>
      </Row>

      <Row>
        <Col md={{ span: 6 }}>
          <AnalyticLine />
        </Col>

        <Col md={{ span: 6 }}>
          <AnalyticBar />
        </Col>
      </Row>
    </AdminLayout>
  );
}
