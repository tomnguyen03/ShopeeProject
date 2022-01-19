import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Product from "../pages/Products";
import Categories from "../pages/Categories";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/customers" component={Customers} />
      <Route path="/products" component={Product} />
      <Route path="/categories" component={Categories} />
    </Switch>
  );
};

export default Routes;
