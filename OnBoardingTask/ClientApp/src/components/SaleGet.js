import React, { Component } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faCoffee,
  faFileExcel,
  faTrash,
} from "@fortawesome/fontawesome-free-solid";
import {
  Table,
  Form,
  Button,
  Icon,
  Modal,
  Container,
  Input,
  Select,
} from "semantic-ui-react";

import qs from "qs";

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
        <CreateSale />
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>SaleID</Table.HeaderCell>

              <Table.HeaderCell>Customer</Table.HeaderCell>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Store</Table.HeaderCell>
              <Table.HeaderCell>Date Sold</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
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

                {/* <RouterLink to={`/Sale/Edit`}>
                  <Button
                    onClick={() => {
                      const id = c.id;
                      localStorage.setItem("id", id);
                    }}
                  >
                    Edit
                  </Button>
                </RouterLink> */}
                <Button basic>
                  <SaleUpdate id={c.id} />
                </Button>

                <Button basic>
                  <SaleDelete id={c.id} />
                </Button>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    );
  }
}

export class SaleDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  render() {
    return (
      <>
        <Modal
          onOpen={() => this.setState({ open: true })}
          onClose={() => this.setState({ open: false })}
          open={this.state.open}
          trigger={
            <Button color="red">
              <FontAwesomeIcon icon={faTrash} />
              &nbsp;DELETE
            </Button>
          }
        >
          <Modal.Header>Delete Sale</Modal.Header>
          <Modal.Content>Are you sure you want to Delete ?</Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => this.setState({ open: false })}
            >
              Cancel
            </Button>
            <Button
              color="red"
              onClick={() => {
                Axios.delete(`api/Sales/${this.props.id}`);
                this.setState({ open: false });
              }}
            >
              Delete
            </Button>
          </Modal.Actions>
        </Modal>
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
      open: false,
    };
  }

  getSalebyId(id) {
    Axios.get(`api/Sales/${this.props.id}`).then((res) => {
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
      dateSold: this.state.dateSold,
    };
    Axios.put(`api/Sales/${this.state.id}`, data)
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        this.setState({ open: false });
      });

    // e.preventDefault()
  };
  render() {
    return (
      <>
        <Modal
          onClose={() => this.setState({ open: false })}
          onOpen={() => this.setState({ open: true })}
          open={this.state.open}
          trigger={
            <Button color="orange">
              <Icon name="edit" />
              EDIT
            </Button>
          }
        >
          <Modal.Header>Edit your Sale Details</Modal.Header>
          <Modal.Content>
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
              <h5>Date Sold: {this.state.dateSold}</h5>
              <Form.Field>
                <label>Click to Change Sold Date</label>
                <input
                  name="dateSold"
                  type="date"
                  value={this.state.dateSold}
                  onChange={this.myChangeHandler}
                >
                </input>
                {/* <label>{this.state.dateSold}</label> */}
              </Form.Field>

              <Button color="green" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => this.setState({ open: false })}
            >
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
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
      open: false,
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
        this.setState({ open: false });
      });

    // e.preventDefault()
  };

  render() {
    return (
      <>
        <Modal
          onClose={() => this.setState({ open: false })}
          onOpen={() => this.setState({ open: true })}
          open={this.state.open}
          trigger={<Button color="blue">Add Sale</Button>}
        >
          <Modal.Header>fill in your Sale Details</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label>Choose a Customer:</label>
                <select name="customer" onChange={this.myChangeHandler}>
                  <option value="" disabled selected>
                    Select the customer
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
                    Select the product
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
                    Select the store
                  </option>

                  {this.state.stores.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </Form.Field>
              <Form.Field>
                <label>Choose a Date</label>
                <Input
                  type="date"
                  name="dateSold"
                  onChange={this.myChangeHandler}
                />
              </Form.Field>

              <Button color="green" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => this.setState({ open: false })}
            >
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}
