import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/home';
import DetailTour from './pages/detailTour';
import Payment from './pages/payment';
import Profile from './pages/profile';
import ListTransaction from './pages/listTransaction';
import Trips from './pages/Trips';
import AddTrips from './pages/addTrip';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter,Route,Switch,Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import AuthContext from "./cartContext";



ReactDOM.render(

  <React.StrictMode>
    <BrowserRouter>
      <AuthContext>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path={`/detail/:id`} component={DetailTour}/>
            <Route exact path="/payments" component={Payment}/>
            <Route exact path="/profiles" component={Profile}/>
            <Route exact path="/transactions" component={ListTransaction}/>
            <Route exact path="/trip" component={Trips}/>
            <Route exact path="/add-trip" component={AddTrips}/>
          </Switch>
        </AuthContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
