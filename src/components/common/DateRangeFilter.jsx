import React, { useState } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Moment from "react-moment";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";

export default function DateRangeFilterComponent(props) {
  const [state, setState] = useState();
  const handleCallback = (start, end) => {
    setState({ start, end });
    if (props.onChange) {
      props.onChange({ start: start.format('YYYY-MM-DD'), end: end.format('YYYY-MM-DD') })
    }
  };

  // useEffect(() => {

  // }, []);
  const date = new Date()
  return (
    <DateRangePicker
      initialSettings={{
        endDate: date,
        startDate: date.setDate(date.getDate() + 2),
        timePicker: true,
        minYear: 2000,
        showDropdowns: true,
        locale: {
          format: "MM-DD-YYYY",
        },
      }}
      onCallback={handleCallback}
    >
      <input
        type="text"
        className="form-control"
        style={{ minWidth: "218px" }}
      />

      {/* <button className='btn btn-sm'>
        <img src="https://assets.stickpng.com/images/5ae6cd086554160a79be9f44.png" alt="calendar" width='32'/>

      </button> */}
      {/* <input type="text" className="form-control col-4" /> */}
    </DateRangePicker>
  );
}
