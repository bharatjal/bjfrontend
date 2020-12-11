import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import AdminLogin from '../main/admin/adminLogin'
import DriverLogin from '../main/Driver/driverLogin'
import Dashboard from '../main/Dashboard'
import driverRegistration from '../main/Driver/driverRegistration'
import Driver from '../main/admin/driver'
import DriverDetail from '../main/admin/driverDetail'
import DriverCreate from '../main/admin/driverCreate'
import DriverUpdate from '../main/admin/driverUpdate'
import Fillup from '../main/admin/fillup'
import FillupCreate from '../main/admin/fillupCreate'
import FillupDetail from '../main/admin/fillupDetail'
import Transaction from '../main/admin/transaction'
import TransactionCreate from '../main/admin/transactionCreate'
import TransactionDetail from '../main/admin/transactionDetail'
import FrontPage from '../main/admin/frontPage'

import Deliveries from '../main/admin/deliveries'
import DailyDeliveries from '../main/admin/DailyDeliveries'
import DeliveriesSum from '../main/admin/DeliveriesSum'
import DeliveryDetail from '../main/admin/deliveryDetail'
import deliveryTracking from '../main/admin/deliveryTracking'

import Error from '../main/admin/error'

export default class Routings extends React.Component{
    render(){
        return(
            <>
                <Router>
                    <Switch>
                        <Route exact path='/' component={FrontPage}/>
                        <Route path='/admin-console' component={AdminLogin}/>
                        <Route path='/driver-console' component={DriverLogin}/>
                        <Route path='/driver-registration' component={driverRegistration}/>
                        {/* <Route path='/adminLogin' component={AdminLogin}/> */}
                        <Route path='/homepage' component={Driver}/>
                        <Route path='/dashboard' component={Dashboard}/>
                        <Route path='/driverDetail/:id' component={DriverDetail}/>
                        <Route path='/driverCreate' component={DriverCreate}/>
                        <Route path='/driverUpdate' component={DriverUpdate}/>
                        <Route path='/fillup' component={Fillup}/>
                        <Route path='/create-fillup' component={FillupCreate}/>
                        <Route path='/fillupDetail' component={FillupDetail}/>
                        <Route path='/transaction' component={Transaction}/>
                        <Route path='/create-transaction' component={TransactionCreate}/>
                        <Route path='/transactionDetail' component={TransactionDetail}/>

                        <Route path='/deliveries' component={Deliveries}/>
                        <Route path='/daily-deliveries' component={DailyDeliveries}/>
                        <Route path='/deliveries-sum' component={DeliveriesSum}/>
                        <Route path='/deliveryDetail/:id' component={DeliveryDetail}/>
                        <Route path='/delivery-tracking' component={deliveryTracking}/>
                        <Route component={Error}/>
                    </Switch>
                </Router>

                </>
            )
    }
}