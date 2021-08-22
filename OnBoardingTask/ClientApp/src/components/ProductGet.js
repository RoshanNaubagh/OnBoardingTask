import React, { Component } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
} from "@fortawesome/fontawesome-free-solid";
import { Table, Form, Button, Icon, Modal, Container } from "semantic-ui-react";


export class ProductGet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [
        {
          id: 0,
          name: "",
          price: "",
        },
      ],
    };
  }
  refreshProductsList() {
    Axios.get(`api/Products`).then((res) => {
      this.setState({ products: res.data });
    });
  }

  componentDidMount() {
    this.refreshProductsList();
    console.log(this.state.showModal);
  }

  componentDidUpdate() {
    this.refreshProductsList();
  }

  render() {
    return (
      <>
        <div>
          <CreateProduct />
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.products.map((c) => (
                <Table.Row key={c.id}>
                  <Table.Cell>{c.name} </Table.Cell>
                  <Table.Cell>{c.price}</Table.Cell>
                  <Table.Cell>
                  <Button basic>
                    <UpdateProduct />
                  </Button>
                  <Button basic>
                    <DeleteProduct id={c.id} name={c.name} price={c.price} />
                  </Button>
                  </Table.Cell>
                  
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </>
    );
  }
}

export class UpdateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      price: "",
      open: false,
    };
  }
  getProductbyId(id) {
    Axios.get(`api/Products/${id}`).then((res) => {
      this.setState({
        id: res.data.id,
        name: res.data.name,
        price: res.data.price,
      });
    });
  }
  componentDidMount() {
    const ids = localStorage.getItem("id");
    console.log(ids);
    this.getProductbyId(ids);
  }
  updateState = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = () => {
    const ids = localStorage.getItem("id");

    Axios.put(`api/Products/${ids}`, this.state)
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        this.setState({ open: false });
      });
  };
  render() {
    return (
      <div>
        <Modal
          onOpen={() => this.setState({ open: true })}
          onClose={() => this.setState({ open: false })}
          open={this.state.open}
          trigger={
            <Button color="orange">
              <Icon name="edit" />
              EDIT
            </Button>
          }
        >
          <Modal.Header>Edit in Product Details</Modal.Header>
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
                <label>Price</label>
                <input
                  type="text"
                  name="price"
                  value={this.state.price}
                  onChange={this.updateState}
                />
              </Form.Field>
              <Button color="green" type="submit">Submit</Button>
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
export class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      id: 0,
      name: "",
      price: "",
      open: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios.post("/api/Products", this.state)
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        this.props.history.push("/Product");
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
        <Modal
          onOpen={() => this.setState({ open: true })}
          onClose={() => this.setState({ open: false })}
          open={this.state.open}
          trigger={<Button color="green">Create</Button>}
        >
          <Modal.Header>Fill in the Product Details</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label>Name</label>
                <input type="text" name="name" onChange={this.updateState} />
              </Form.Field>
              <Form.Field>
                <label>Price</label>
                <input type="text" name="price" onChange={this.updateState} />
              </Form.Field>
              <Button type="submit">Submit</Button>
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

export class DeleteProduct extends Component {
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
          <Modal.Header>Delete Product</Modal.Header>
          <Modal.Content>
            <h1>
              <b>Are you sure you want to delete?</b>
            </h1>
            <h2>Name: {this.props.name}</h2>
            <h2>Price: {this.props.price}</h2>
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
                Axios.delete(`api/Products/${this.props.id}`);
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
