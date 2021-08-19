import React, { Component } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router";
import dateFormat from "dateformat";

import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import qs from "qs";

import { Table, Form, Dropdown, Modal, Input } from "semantic-ui-react";

export class SaleGet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sales: [],
      open: false,
    };
  }

  getAllSales() {
    Axios.get(`api/Sales`).then((res) => {
      this.setState({ sales: res.data });
    });
  }
  componentDidMount() {
    this.getAllSales();
  }
  componentDidUpdate() {
    this.getAllSales();
  }

  render() {
    return (
      <>
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>SaleID</Table.HeaderCell>

              <Table.HeaderCell>Customer</Table.HeaderCell>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Store</Table.HeaderCell>
              <Table.HeaderCell>Date Sold</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.sales.map((c) => (
              <Table.Row key={c.id}>
                <Table.Cell>{c.id} </Table.Cell>
                <Table.Cell>{c.customer.name} </Table.Cell>
                <Table.Cell>{c.product.name}</Table.Cell>
                <Table.Cell>{c.store.name}</Table.Cell>
                <Table.Cell>{c.dateSold}</Table.Cell>

                <RouterLink to={`/Sale/Edit`}>
                  <Button
                    onClick={() => {
                      const id = c.id;
                      localStorage.setItem("id", id);
                    }}
                  >
                    Edit
                  </Button>
                </RouterLink>

                <Button
                  onClick={() => {
                    Axios.delete(`api/Sales/${c.id}`);
                    this.setState({
                      sales: this.state.sales.filter((f) => f.id !== c.id),
                    });
                  }}
                >
                  Delete
                </Button>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div>
          <RouterLink to="/Sale/Add">
            <Button>Add Sale</Button>
          </RouterLink>
        </div>
      </>
    );
  }
}

export class SaleUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      customer: 0,
      product: 0,
      store: 0,
      dateSold: "",
      customers: [],
      products: [],
      stores: [],
    };
  }

  getSalebyId(id) {
    Axios.get(`api/Sales/${id}`).then((res) => {
      this.setState({
        id: id,
        customer: res.data.customerId,
        product: res.data.productId,
        store: res.data.storeId,
        dateSold: res.data.dateSold,
      });
    });
  }

  componentDidMount() {
    const ids = localStorage.getItem("id");
    this.getSalebyId(ids);
    Axios.get(`api/Customers`).then((res) => {
      this.setState({ customers: res.data });
    });
    Axios.get(`api/Products`).then((res) => {
      this.setState({ products: res.data });
    });
    Axios.get(`api/Stores`).then((res) => {
      this.setState({ stores: res.data });
    });
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    const data = {
      id: this.state.id,
      customerId: this.state.customer,
      productId: this.state.product,
      storeId: this.state.store,
      // dateSold: this.state.dateSold,
    };
    Axios.put(`api/Sales/${this.state.id}`, data)
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        this.props.history.push("/Sale");
      });

    // e.preventDefault()
  };
  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Choose a Customer:</label>
            <select
              name="customer"
              value={this.state.customer}
              onChange={this.myChangeHandler}
            >
              {this.state.customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Form.Field>
          <Form.Field>
            <label>Choose a Product:</label>
            <select
              name="product"
              value={this.state.product}
              onChange={this.myChangeHandler}
            >
              {this.state.products.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Form.Field>
          <Form.Field>
            <label>Choose a Store:</label>
            <select
              name="store"
              value={this.state.store}
              onChange={this.myChangeHandler}
            >
              {this.state.stores.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Form.Field>
          <Form.Field value={this.state.dateSold}>
            <label>{this.state.dateSold}</label>
            
          </Form.Field>

          <Button type="submit">Submit</Button>
        </Form>
      </>
    );
  }
}

export class CreateSale extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      customer: 0,
      product: 0,
      store: 0,
      dateSold: "",
      customers: [],
      products: [],
      stores: [],
    };
  }

  componentDidMount() {
    Axios.get(`api/Customers`).then((res) => {
      this.setState({ customers: res.data });
    });
    Axios.get(`api/Products`).then((res) => {
      this.setState({ products: res.data });
    });
    Axios.get(`api/Stores`).then((res) => {
      this.setState({ stores: res.data });
    });
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    Axios.post(`api/Sales`, {
      customerId: this.state.customer,
      productId: this.state.product,
      storeId: this.state.store,
      dateSold: this.state.dateSold,
    })
      .then((res) => {
        console.log(this.state);
        console.log(res.data);
      })
      .then(() => {
        this.props.history.push("/Sale");
      });

    // e.preventDefault()
  };

  render() {
    return (
      <>
        <h1>Fill in the Sales Details</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Choose a Customer:</label>
            <select name="customer" onChange={this.myChangeHandler}>
              <option value="" disabled selected>
                Select your Customer
              </option>

              {this.state.customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Form.Field>
          <Form.Field>
            <label>Choose a Product:</label>
            <select name="product" onChange={this.myChangeHandler}>
              <option value="" disabled selected>
                Select your Product
              </option>

              {this.state.products.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Form.Field>
          <Form.Field>
            <label>Choose a Store:</label>
            <select name="store" onChange={this.myChangeHandler}>
              <option value="" disabled selected>
                Select your Store
              </option>

              {this.state.stores.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Form.Field>
          

          <Button type="submit">Submit</Button>
        </Form>
      </>
    );
  }
}
