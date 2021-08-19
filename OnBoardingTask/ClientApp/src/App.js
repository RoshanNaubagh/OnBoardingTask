import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import {CustomerGet,CreateCustomer,UpdateCustomer} from './components/CustomerGet';
import {ProductGet,CreateProduct,UpdateProduct } from './components/ProductGet';
import {StoreGet,CreateStore,UpdateStore } from './components/StoreGet';
import {SaleGet,CreateSale,SaleUpdate} from './components/SaleGet';


import 'semantic-ui-css/semantic.min.css';


import './custom.css'

export default class App extends Component {
  static displayName = App.name;


  render () {

    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/Customer' component={CustomerGet} />
        <Route path='/Customer/Add' component={CreateCustomer} />
        <Route path='/Customer/Edit' component={UpdateCustomer} />
        <Route path='/Product' component={ProductGet} />
        <Route path='/Product/Add' component={CreateProduct} />
        <Route path='/Product/Edit' component={UpdateProduct} />
        <Route path='/Store' component={StoreGet} />
        <Route path='/Store/Add' component={CreateStore} />
        <Route path='/Store/Edit' component={UpdateStore} />
        <Route path='/Sale' component={SaleGet} />
        <Route path='/Sale/Add' component={CreateSale} />
        <Route path='/Sale/Edit' component={SaleUpdate} />

        
        




      </Layout>
    );
  }
}
