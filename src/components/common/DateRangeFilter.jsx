import React, { useEffect, useState } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Moment from "react-moment";
import { Row, Col } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";

export default function DateRangeFilterComponent(props) {

  const [state, setState] = useState({ start : new Date() , end : new Date() });
  console.log(JSON.stringify(state) + "hgjh")
  const handleCallback = (start, end) => {
    setState({ ...state, start: start.format('YYYY-MM-DD hh:mm') })
    if (props.onChange ) {
      props.onChange({ ...state })
      // props.onChange({ start: start.format('YYYY-MM-DD'), end: end.format('YYYY-MM-DD') })
    }
  };
  const handleCallbacks = (start, end) => {
    // const { starts ,ends} = { start, end }
    setState({ ...state, end: end.format('YYYY-MM-DD hh:mm') });
    if (props.onChange) {
      props.onChange({ ...state })
      // props.onChange({ start: start.format('YYYY-MM-DD'), end: end.format('YYYY-MM-DD') })
    }
  };

  // useEffect(()=>{
  //   if (props.onChange) {
  //     props.onChange({ ...state })
  //     // props.onChange({ start: start.format('YYYY-MM-DD'), end: end.format('YYYY-MM-DD') })
  //   }
  // },[state])

  return (
    <>
      From:
      <DateRangePicker
        initialSettings={{
          timePicker24Hour: true,
          singleDatePicker: true,
          timePicker: true,
          minYear: 2000,
          showDropdowns: true,
          locale: {
            format: "YYYY-MM-DD hh:mm",
          },
        }}
        onCallback={handleCallback} >
        <input type="text" className="form-control" style={{ fontSize: '13px', minWidth: "140px" }} value={state.start} />
      </DateRangePicker >
      To:
      <DateRangePicker
        initialSettings={{
          timePicker24Hour: true,
          singleDatePicker: true,
          timePicker: true,
          minYear: 2000,
          showDropdowns: true,
          locale: {
            format: "YYYY-MM-DD hh:mm",
          },
        }}
        onCallback={handleCallbacks}>
        <input type="text" className="form-control" style={{ fontSize: '13px', minWidth: "140px" }} value={state.end} />
      </DateRangePicker>
    </>
  );
}
