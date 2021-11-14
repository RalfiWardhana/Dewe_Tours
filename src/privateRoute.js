import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAdmin } from './components/button';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (isAdmin() ? <Component {...props} /> :  
    <Redirect to="/" />)} />                         
)


export default PrivateRoute;