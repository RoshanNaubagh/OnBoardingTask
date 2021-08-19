import React, { Component } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router";

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

import { Table, Form } from "semantic-ui-react";

export class CustomerGet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [
        {
          id: 0,
          name: "",
          address: "",
        },
      ],
      loading: true,
      showModal: false,
    };
  }

  refreshCustomersList() {
    Axios.get(`api/Customers`).then((res) => {
      this.setState({ customers: res.data });
    });
  }

  componentDidMount() {
    this.refreshCustomersList();
    console.log(this.state.showModal);
  }

  componentDidUpdate() {
    this.refreshCustomersList();
  }

  render() {
    return (
      <>
        <div>
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Address</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.customers.map((c) => (
                <Table.Row key={c.id}>
                  <Table.Cell>{c.name} </Table.Cell>
                  <Table.Cell>{c.address}</Table.Cell>
                  <RouterLink to = {`/Customer/Edit`}>
              <Button onClick={()=>{
                const id = c.id;
                localStorage.setItem('id', id);
              }}>Edit</Button>
            </RouterLink>
                  
                  
                  <Button
                    onClick={() => {
                      Axios.delete(`api/Customers/${c.id}`);
                      this.setState({
                        customers: this.state.customers.filter((f) => f.id !== c.id),
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
            <RouterLink to="/Customer/Add">
              <Button>Add Customer</Button>
            </RouterLink>
          </div>
        </div>
      </>
    );
  }
}
export class UpdateCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:0,
      name: "",
      address: "",
    };

  }
  getCustomerbyId(id) {
    Axios.get(`api/Customers/${id}`).then((res) => {
      console.log('i am here');
      this.setState({ id:res.data.id,name: res.data.name, address: res.data.address });
    });
  }
  componentDidMount(){
    const ids = localStorage.getItem('id');
    console.log(ids);
    this.getCustomerbyId(ids);
  }
  updateState = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = () => {
    const ids = localStorage.getItem('id');

    Axios.put(`api/Customers/${ids}`, this.state)
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        this.props.history.push("/Customer");
      });
  };
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.updateState}
            />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.updateState}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}
export class CreateCustomer extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      id: 0,
      name: "",
      address: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios.post("/api/Customers", this.state)
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        this.props.history.push("/Customer");
      });

    // e.preventDefault()
  };

  componentDidMount() {
    console.log(this.state);
  }

  updateState = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <>
        <h1>Fill in the Customers Details</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Name</label>
            <input type="text" name="name" onChange={this.updateState} />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <input type="text" name="address" onChange={this.updateState} />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </>
    );
  }
}
