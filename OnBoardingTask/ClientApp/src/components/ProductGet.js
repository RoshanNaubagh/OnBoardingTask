import React, { Component } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router";
import { Button, ButtonToolbar } from "react-bootstrap";

import { Table, Form } from "semantic-ui-react";

import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";

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
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.products.map((c) => (
                <Table.Row key={c.id}>
                  <Table.Cell>{c.name} </Table.Cell>
                  <Table.Cell>{c.price}</Table.Cell>
                  <RouterLink to={`/Product/Edit`}>
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
                      Axios.delete(`api/Products/${c.id}`);
                      this.setState({
                        products: this.state.products.filter(
                          (f) => f.id !== c.id
                        ),
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
            <RouterLink to="/Product/Add">
              <Button>Add Product</Button>
            </RouterLink>
          </div>
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
        this.props.history.push("/Product");
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
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={this.state.price}
              onChange={this.updateState}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
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
        <h1>Fill in the Customers Details</h1>
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
      </>
    );
  }
}
