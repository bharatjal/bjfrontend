import React from 'react'
import Routings from './components/routing/routing'
import './index.scss'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppBar from './components/partials/AppBar'

export default class App extends React.Component{
  render(){
    return(
      <div className="main-bg">
        <ToastContainer />
        <AppBar />
        <Routings/>
      </div>
    )
  }
}