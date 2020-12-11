import React from 'react'
import Routings from './components/routing/routing'
import './index.scss'

import AppBar from './components/partials/AppBar'

export default class App extends React.Component{
  render(){
    return(
      <>
        <AppBar />
        <Routings/>
      </>
    )
  }
}