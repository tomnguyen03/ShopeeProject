import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Product from "../pages/Products";
import Categories from "../pages/Categories";
import FormAddCategory from "./form/formAddCategory";
import Orders from "./../pages/Orders";
import FormAddProducts from "./form/formAddProducts";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/customers" component={Customers} />
      <Route path="/products" component={Product} />
      <Route path="/categories" component={Categories} />
      <Route path="/addCategories" component={FormAddCategory} />
      <Route path="/orders" component={Orders} />
      <Route path="/addProducts" component={FormAddProducts} />
    </Switch>
  );
};

export default Routes;
