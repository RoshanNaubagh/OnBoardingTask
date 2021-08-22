import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { CustomerGet } from "./components/CustomerGet";
import { ProductGet } from "./components/ProductGet";
import { StoreGet } from "./components/StoreGet";
import { SaleGet } from "./components/SaleGet";

import "semantic-ui-css/semantic.min.css";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/Customer" component={CustomerGet} />

        <Route path="/Product" component={ProductGet} />

        <Route path="/Store" component={StoreGet} />

        <Route path="/Sale" component={SaleGet} />
      </Layout>
    );
  }
}
