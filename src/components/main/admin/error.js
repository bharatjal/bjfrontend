import React from 'react'
import AdminLayout from "./AdminLayout";
import {Link} from 'react-router-dom'

export default class Homepage extends React.Component{
    render(){
        return(
            <AdminLayout>
                <h1>ERROR: 404</h1>
                <h4>Page Not Found</h4>
                <h4><Link to="/">Please Try Again</Link></h4>
            </AdminLayout>
        )
    }
}