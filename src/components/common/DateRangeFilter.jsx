import React, { useEffect, useState } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";
import { Row, Col, Button } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";

export default function DateRangeFilterComponent(props) {

  const [state, setState] = useState();
  const handleCallback = (start, end) => {
    setState({ ...state, start: start.format('YYYY-MM-DD HH:mm') })
    // if(!end) setState({ ... state,end : new Date()})
  };
  const handleCallbacks = (start, end) => {
    setState({ ...state, end: end.format('YYYY-MM-DD HH:mm') });
    // if(!start) setState({ ... state,start : new Date()})
  };

  return (
    <>
      From:
      <DateRangePicker
        initialSettings={{
          // startDate: moment(),
          timePicker24Hour: true,
          singleDatePicker: true,
          timePicker: true,
          minYear: 2000,
          showDropdowns: true,
          locale: {
            format: "YYYY-MM-DD HH:mm",
          },
        }}
        onCallback={handleCallback} >
        <input type="text" className="form-control" style={{ fontSize: '13px', minWidth: "140px" }} />
      </DateRangePicker >
      To:
      <DateRangePicker
        initialSettings={{
          startDate: new Date(),
          timePicker24Hour: true,
          singleDatePicker: true,
          timePicker: true,
          minYear: 2000,
          showDropdowns: true,
          locale: {
            format: "YYYY-MM-DD HH:mm",
          },
        }}
        onCallback={handleCallbacks}>
        <input type="text" className="form-control" style={{ fontSize: '13px', minWidth: "140px" }} />
      </DateRangePicker>
      <Button size="sm" onClick={() => { props.onCustomOnChange(state) }}> Apply </Button>
    </>
  );
}
