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
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";

import { Table, Form, Button, Icon, Modal, Container } from "semantic-ui-react";
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
      modalOpen: false,
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
          <div>
            <CreateCustomer />
          </div>
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Address</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.customers.map((c) => (
                <Table.Row key={c.id}>
                  <Table.Cell>{c.name} </Table.Cell>
                  <Table.Cell>{c.address}</Table.Cell>

                  <Button basic>
                    <UpdateCustomer id={c.id} />
                  </Button>

                  <Button basic>
                    <DeleteCustomer
                      id={c.id}
                      name={c.name}
                      address={c.address}
                    />
                  </Button>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </>
    );
  }
}
export class UpdateCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      address: "",
      open: false,
    };
  }
  getCustomerbyId(id) {
    Axios.get(`api/Customers/${this.props.id}`).then((res) => {
      console.log("i am here");
      this.setState({
        id: res.data.id,
        name: res.data.name,
        address: res.data.address,
      });
    });
  }
  componentDidMount() {
    const ids = localStorage.getItem("id");
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
    const ids = localStorage.getItem("id");

    Axios.put(`api/Customers/${this.props.id}`, this.state)
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        // this.props.history.push("/Customer");]
        this.setState({ open: false });
      });
  };
  render() {
    return (
      <div>
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
          <Modal.Header>Edit in the Customer Details</Modal.Header>
          <Modal.Content>
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
              <Button type="submit" color="green">Submit</Button>
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
      </div>
    );
  }
}

export class DeleteCustomer extends Component {
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
          onClose={() => this.setState({ open: false })}
          onOpen={() => this.setState({ open: true })}
          open={this.state.open}
          trigger={
            <Button color="red">
              <FontAwesomeIcon icon={faTrash} />
              &nbsp;DELETE
            </Button>
          }
        >
          <Modal.Header>Delete Customer</Modal.Header>
          <Modal.Content>
            <h1>
              <b>Are you sure you want to delete?</b>
            </h1>
            <h2>Name: {this.props.name}</h2>
            <h2>Address: {this.props.address}</h2>
          </Modal.Content>
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
                Axios.delete(`api/Customers/${this.props.id}`);
                this.setState({ open: false });

              }}
            >
              Confirm
            </Button>
          </Modal.Actions>
        </Modal>
      </>
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
      open: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios.post("/api/Customers", this.state)
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        this.setState({ open: false });
      });
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
        <Modal
          className={this.formStyles}
          onClose={() => this.setState({ open: false })}
          onOpen={() => this.setState({ open: true })}
          open={this.state.open}
          trigger={<Button color="green">Add Customer</Button>}
          centered={false}
        >
          <Modal.Header>Fill in the Customer Details</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit} style={{ alignItems: "center" }}>
              <Form.Field>
                <label>Name</label>
                <input type="text" name="name" onChange={this.updateState} />
              </Form.Field>
              <Form.Field>
                <label>Address</label>
                <input type="text" name="address" onChange={this.updateState} />
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
