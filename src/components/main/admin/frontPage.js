import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default class FrontPage extends React.Component {

  render() {
    return (
      <Container className="text-center mb-all">  
        <Row>
          <Col>
            <h3 className="display-1 mb-2 my-sm-5 my-font" style={{ fontSize : '70px'}}>Bharat Jal</h3>
            <Link to="/admin-console" className="btn btn-primary btn-md mx-2">
              Admin
            </Link>
            <Link to="/driver-console" className="btn btn-danger btn-md mx-2">
              Driver
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}
