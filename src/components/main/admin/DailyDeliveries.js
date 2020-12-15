import React from "react";
import AdminLayout from "./AdminLayout";
import BootstrapTable, { FILTERS_POSITION_BOTTOM } from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import filterFactory, {
  textFilter,
  FILTER_TYPES,
  dateFilter,
  Comparator,
  customFilter,
} from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import DateRangeFilterComponent from '../../common/DateRangeFilter'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import moment from 'moment'
import { Spinner } from "react-bootstrap"
import { logDOM } from "@testing-library/react";
import { toast } from "react-toastify"
export default class DailyDeliveries extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: "",
      loading: false,
    };
  }

  componentWillMount = () => {
    //let tokens = this.props.location.state.token
    let localdata = localStorage.getItem("token");
    if (!localdata) {
      this.props.history.push("/");
      toast.error("You are not logged in");
    }
    this.setState({ token: localdata });
  };

  componentDidMount = () => {

    let x = this.state.token;
    const url = "https://bharatjaldispenser.herokuapp.com/delivery/daily";
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
        // console.log(responseJson);
        this.setState({ loading: false })
        this.setState({ data: responseJson?.deliveries });
        console.log(responseJson)
      })
      .catch((error) => {
        this.setState({ loading: false })
        console.log(error + "  getting an error in getting the data");
      });
  };

  delete = (device_id) => {
    this.setState({ loading: true });

    //alert(JSON.stringify(device_id))
    let x = this.state.token;
    const url = "https://bharatjaldispenser.herokuapp.com/driver/delete/" + device_id;
    fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application.json",
        "x-access-token": x,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(
          JSON.stringify(responseJson) + "successfully deleted........"
        );
        toast.success(responseJson.message);
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(
          JSON.stringify(error) + "  getting an error in getting the data"
        );
      });
  };
  filterByDate = (dates) => {
    try {
      if (dates) {
        let x = this.state.token;
        if (!dates.start) dates.start = moment(new Date(), 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm')
        if (!dates.end) dates.end = moment(new Date(), 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm')
        const url = "https://bharatjaldispenser.herokuapp.com/delivery/datetime/filter?timestamp_from=" + dates.start + "&timestamp_to=" + dates.end
        console.log(url);
        fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application.json",
            "x-access-token": x,
          }
          // params :{

          // }
        }).then((response) => response.json())
          .then(response => {
            console.log(response);
            this.setState({ data: response.deliveries })
          })
      }
    } catch (error) {

    }
  }
  render() {
    const { SearchBar } = Search;
    const columns = [
      // {
      //   dataField: "date",
      //   text: "Date",
      //   sort: true,
      //   filter: dateFilter({
      //     withoutEmptyComparatorOption: true,
      //     comparators: [Comparator.EQ],
      //     comparatorClassName: "d-none",
      //     style: { display: "inline-grid" },
      //     id: "id",
      //   }),
      // },
      {
        dataField: "date",
        text: "Date ",
        // sort: true,
        filter: customFilter({
          type: FILTER_TYPES.DATE,
          onFilter: filterVal => {
            console.log(filterVal)
            return this.filterByDate(filterVal)
            //   return deviceData?.filter(s => {
            //     // return !!(moment(s.date).isSameOrAfter(filterVal.start) && moment(s.date).isSameOrBefore(filterVal.end))
            //   })
          }
        }),
        filterRenderer: (onFilter, column) =>
          <DateRangeFilterComponent onCustomOnChange={this.filterByDate} column={column} />
      },
      {
        dataField: "d_vehicle_num",
        text: "Vehicle",
        sort: true,
      },
      {
        dataField: "driver_name",
        text: "Driver",
        sort: true,
      },
      {
        dataField: "driver_email",
        text: "Email",
        sort: true,
        filter: textFilter(),
      },
      {
        dataField: "thmlunit",
        text: "Nimbu Pani (Unit)/250ML",
        sort: true,
      },
      {
        dataField: "tfmlunit",
        text: "GLasses (Unit)/250ML",
        sort: true,
      },
      {
        dataField: "fhmlunit",
        text: "Bottle (Unit)/500ML",
        sort: true,
      },
      {
        dataField: "olunit",
        text: "Bottle (Unit)/1L",
        sort: true,
      },
      {
        dataField: "thmlltrs",
        text: "Nimbu Pani (Ltrs.)/200ML",
        sort: true,
      },
      {
        dataField: "tfmlltrs",
        text: "GLasses (Ltrs.)/250ML",
        sort: true,
      },
      {
        dataField: "fhmlltrs",
        text: "Bottle (Ltrs.)/500ML",
        sort: true,
      },
      {
        dataField: "olltrs",
        text: "Bottle (Ltrs.)/1L",
        sort: true,
      },
      {
        dataField: "sum_of_ltrs",
        text: "Sum of Ltrs",
        sort: true,
      },
      {
        dataField: "sum_of_amount",
        text: "Sum of Amount",
        sort: true,
      },
      {
        dataField: "incentive",
        text: "Incentive",
        sort: true,
      },
    ];
    let deviceData = this.state.data;

    return (
      <AdminLayout>
        {  this.state.loading ?
          <div className="d-flex align-items-center justify-content-center spinnerCont">
            <Spinner animation="border" variant="info" classame="spinner" />
          </div>
          :
          <ToolkitProvider
            keyField="id"
            data={deviceData}
            columns={columns}
            bootstrap4
            striped
            search
          >
            {(props) => (
              <>
                <Row>
                  <Col sm={6}>
                    <h2>Daily Deliveries</h2>
                  </Col>
                  <Col sm={6} className="text-right">
                    <SearchBar {...props.searchProps} />

                    <ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      className="download-table-xls-button mx-2 btn-primary"
                      table="table-to-xls-all-data"
                      filename="Daily Deliveries"
                      sheet="Daily Deliveries"
                      buttonText="Download as XLS"
                    />

                  </Col>
                  <hr />
                </Row>
                <Row>
                  <Col sm={12} className="isTable">
                    <BootstrapTable
                      id="table-to-xls-all-data"
                      keyField="id"
                      filter={filterFactory()}
                      // filterPosition="top"
                      pagination={paginationFactory({
                        showTotal: true,
                      })}
                      {...props.baseProps}
                    />
                  </Col>
                </Row>
              </>
            )}
          </ToolkitProvider>
        }
      </AdminLayout>
    );
  }
}
