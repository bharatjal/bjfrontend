import React from "react";
import AdminLayout from "./AdminLayout";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
// import Header from "../../common/header";
// import Table from "react-bootstrap/Table";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import filterFactory, { textFilter, dateFilter, Comparator  } from 'react-bootstrap-table2-filter';
//import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button} from 'react-bootstrap';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'


//import './page.scss';

//import Pagination from './Pagination';


// function headerColFormat(column, colIndex) {
//   return (
//     <span>{ column.text }<br/></span>
//   );
// }


export default class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: "",
      loading: false,
      array: null,
      limit: 20, // optional
      page: 1,

      totalPage:null
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
  };

  componentDidMount = () => {
    this.makerequest();
      };

  
  delete = (device_id) => {
    this.setState({ loading: true });

    //alert(JSON.stringify(device_id))
    let x = this.state.token;
    const url =
      "https://bharatjaldispenser.herokuapp.com/driver/delete/" + device_id;
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
        alert(responseJson.message);
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(
          JSON.stringify(error) + "  getting an error in getting the data"
        );
      });
  };

  //onPageChanged = (data) => {
    //const { delivery } = this.state.data;
    //const { currentPage, totalPages, pageLimit } = data;
    //const offset = (currentPage - 1) * pageLimit;
    //const currentCountries = allCountries.slice(offset, offset + pageLimit);

  //  this.setState({ data:delivery, totalPage:totalPages, pageNo:currentPage });
  //}

  makerequest =()=>{
    let x = this.state.token;
    let pageN=this.state.page;
    let limitP=this.state.limit;
    console.log(pageN);
    console.log(limitP);
    const url = `https://bharatjaldispenser.herokuapp.com/delivery/all?page=${pageN}&count=${limitP}`;
    ;
    //  const url = "https://bharatjaldispenser.herokuapp.com/delivery/all";

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
        this.setState({ data: responseJson.deliveries, totalPage:Math.ceil((responseJson.total)/limitP) });
        console.log( 'Hello shubham' );
        console.log(this.state.totalPage);
      })
      .catch((error) => {
        console.log(error + "  getting an error in getting the data");
      });

  };
  paginateValue = (page) => {
    console.log(page)
    if(page=="..."){
      this.paginateNxtValue(page+1);
    }
    else{
    this.state.page=page;
    //console.log(page) // access this value from parent component
    this.makerequest();
  } 
}

paginatePrevValue = (page) => {
  console.log(page);
  //let pagen=page;
 // this.setState({ page: pagen });
 if(page!=0){
  this.state.page=page;
  this.makerequest();
  
 }
}
paginateNxtValue = (page) => {
  console.log(page);
  //let pagen=page;
 // this.setState({ page: pagen });
 if(page<=this.state.totalPage)
 {
  this.state.page=page;
  this.makerequest();
    }
  }

     handleSelect=(e)=>{
      console.log(e);
      this.state.limit=e;
      this.makerequest();
    }


  render() {

 
    const arr=[];
    let i=1;
    
    if(this.state.totalPage<=10){
      for(i=1;i<=this.state.totalPage;i++){
      arr.push(i);
      }
      console.log(arr)
    }
    else{
      for(i=1;i<=4;i++){
        arr.push(i);
      }
      arr.push("...")
      i=this.state.totalPage-3;
      while(i<=this.state.totalPage){
        arr.push(i);
        i++;
      }
      console.log(arr)

    }
    //console.log(arr);
  
    this.state.array=arr;
    console.log(this.state.array);
    const { SearchBar } = Search;
    const columns = [
      {
        dataField: 'date',
        text: 'Date',
        sort: true,
        filter: dateFilter({
		  withoutEmptyComparatorOption: true,
		  comparators: [Comparator.EQ],
		  comparatorClassName: 'd-none',
		  style: { display: 'inline-grid' },
		  id: 'id'
		}),
      },
      {
        dataField: 'time',
        text: 'Time',
        sort: true,
      },
      {
        dataField: 'locality',
        text: 'Sale Point Location',
        isDummyField: true,
        filter: textFilter(),
        formatter: (col, row) => {
          return (
          <>
            {row.locality},
            {row.address}
          </>
        )}
      },
      {
        dataField: 'd_vehicle_num',
        text: 'Vehicle Number',
        filter: textFilter(),
        sort: true
      },

      {
        dataField: 'driver_name',
        text: 'Name',
        sort: true,
        filter: textFilter(),
      },
      {
        dataField: 'driver_email',
        text: 'Email',
        sort: true,
        filter: textFilter(),
      },
      {
        dataField: 'thmlunit',
        // headerFormatter: headerColFormat,
        text: 'Nimbu Pani (Unit) / 200ML',
        sort: true
      },
      {
        dataField: 'tfmlunit',
        text: 'GLasses (Unit) / 250ML',
        sort: true
      },
      {
        dataField: 'fhmlunit',
        text: 'Bottle (Unit) / 500ML',
        sort: true
      },
      {
        dataField: 'olunit',
        text: 'Bottle (Unit) / 1L',
        sort: true
      },
      {
        dataField: 'tds',
        text: 'TDS',
        sort: true
      },
      {
        dataField: 'temp',
        text: 'Temperature',
        sort: true
      },
      {
        dataField: 'thmlltrs',
        text: 'Nimbu Pani (Ltrs.) / 200ML',
        sort: true
      },
      {
        dataField: 'tfmlltrs',
        text: 'GLasses (Ltrs.) / 250ML',
        sort: true
      },
      {
        dataField: 'fhmlltrs',
        text: 'Bottle (Ltrs.) / 500ML',
        sort: true
      },
      {
        dataField: 'olltrs',
        text: 'Bottle (Ltrs.) / 1L',
        sort: true
      },
      {
        dataField: 'sum_of_ltrs',
        text: 'Sum of Ltrs',
        sort: true
      },
      {
        dataField: 'sum_of_amount',
        text: 'Sum of Amount',
        sort: true
      },
      {
        dataField: 'incentive',
        text: 'Incentive',
        sort: true
      },
      {
        dataField: 'limitltrs',
        text: 'Limit Ltrs	',
        sort: true
      },
      {
        dataField: 'warning',
        text: 'Warning',
        sort: true
      },

      {
        dataField: 'location',
        text: 'Last GPRS Location',
        isDummyField: true,
        formatter: (col, row) => {
          return (
          <>
            <a href={`https://www.google.com/maps/place/${row.location}/@28.577813,77.0582406,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d28.577813!4d77.0582406`} rel='noopener' target='_blank'>{row.location}</a>
          </>
        )}
      },
    ]
    //const { allCountries, currentCountries, currentPage, totalPages } = this.state;
    const deviceData = this.state.data;
    const page=this.state.page;
    //console.log('page:',page);
    const limit=this.state.limit;
    const totalP=this.state.totalPage;
    //console.log('limit:',limit);
    // const options = {  
    //                           page: page, 
    //                           sizePerPage: limit,
    //                           pageStartIndex: 1,   
    //                           paginationSize: 3,    
    //                           prePage: 'Prev',
    //                           nextPage: 'Next',   
    //                           firstPage: 'First',
    //                           lastPage: 'Last',    
    //                           totalSize:totalP,
    //                         };
    return (
      <AdminLayout>
        <ToolkitProvider
          keyField="id"
          data={ deviceData }
          columns={ columns }
          bootstrap4
          striped
          search
          >
          {
            props => (
              <>
                <Row>
                  <Col sm={6}>
                  <h2>Realtime Deliveries Tracking</h2>
                  </Col>
                  <Col sm={6} className='text-right'>
                  <SearchBar { ...props.searchProps } />
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button mx-2 btn-primary"
                    table="table-to-xls-all-data"
                    filename="All Deliveries"
                    sheet="All Deliveries"
                    buttonText="Download as XLS"/>
                    </Col>
                  <hr />
                </Row>
                <Row>
                <Col sm={12} className='isTable'>
                <BootstrapTable
				  id="table-to-xls-all-data"
				  keyField='id'
                  filter={ filterFactory() }
                  // filterPosition="top"
                  //pagination={ paginationFactory(options)}
                  //    totalSize:totalP,
                  //    showTotal: true,
                  //    page:page,
                  //    sizePerPage:limit,
                  //    onPageChange:{onPageChanged},
                  //    onSizePerPageChange:{onPageChanged},

                  //  }) }
                  { ...props.baseProps }
                  />
                </Col>
               
              </Row>
              </>
            )
          }

        </ToolkitProvider>
        <div className="mb-2 mt-5 float-left">
        <DropdownButton
            alignLeft
            title={this.state.limit}
            variant="outline-secondary"
            id="dropdown-menu-align-left"
            onSelect={this.handleSelect}
        >
              <Dropdown.Item eventKey="20">20</Dropdown.Item>
              <Dropdown.Item eventKey="50">50</Dropdown.Item>
              <Dropdown.Item eventKey="100">100</Dropdown.Item>
      </DropdownButton>
      </div>
      <div className="mb-2 mt-5 float-right">
        <Button
                      class="btn btn-secondary"
                      variant="outline-secondary"
                      disabled={this.state.page === 1}
                      onClick={() => this.paginatePrevValue(this.state.page - 1)}
                            outline
                            color="secondary"
                        >
                            Previous
                      </Button>{' '}

                        {this.state.array.map((value, index) => {
                            return (
                                <Button
                                    class="btn btn-secondary"
                                    onClick={() => this.paginateValue(value)}
                                    variant={
                                        this.state.page === value
                                            ? "primary"
                                            : "outline-secondary"
                                    }
                                >
                                    {value}
                                </Button>
                            );
                        })}
                        {' '}
                        <Button
                            class="btn btn-secondary"
                            variant="outline-secondary"
                            disabled={this.state.page===this.state.totalPage}
                            onClick={() => this.paginateNxtValue(this.state.page + 1)}
                            outline
                            color="secondary"
                        >
                            Next
                      </Button>
        </div>
      </AdminLayout>
    );
  }
}
