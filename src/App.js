import React, { useState,useEffect,useContext } from 'react';
import './index.css';
import Home from './pages/home';
import DetailTour from './pages/detailTour';
import Payment from './pages/payment';
import Profile from './pages/profile';
import ListTransaction from './pages/listTransaction';
import Trips from './pages/Trips';
import AddTrips from './pages/addTrip';
import Edit from './pages/edit';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Route,Switch,Link} from "react-router-dom";
import AuthContext from "./cartContext";
import PrivateRoute from "./privateRoute"
import Context, { CartContext } from "./cartContext";
import { API,setAuthToken } from "./config/api";


function App() {
  
  return (
    <BrowserRouter>
      <AuthContext>
        <Switch> 
          <Route exact path="/" component={Home}/>
          <Route exact path={`/detail/:id`} component={DetailTour}/>
          <Route exact path="/payments" component={Payment}/>
          <Route exact path="/profiles" component={Profile}/>
          <PrivateRoute exact path="/transactions" component={ListTransaction}/>
          <PrivateRoute exact path="/trip" component={Trips}/>
          <PrivateRoute exact path="/add-trip" component={AddTrips}/>
          <PrivateRoute exact path={`/edit-trip/:id`} component={Edit}/>
        </Switch>
      </AuthContext>
    </BrowserRouter>
  )
}

export default App;