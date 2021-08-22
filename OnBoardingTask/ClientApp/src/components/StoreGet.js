import React, { Component } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/fontawesome-free-solid";
import { Table, Form, Button, Icon, Modal, Container } from "semantic-ui-react";

export class StoreGet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Stores: [
        {
          id: 0,
          name: "",
          address: "",
        },
      ],
    };
  }
  refreshStoresList() {
    Axios.get(`api/Stores`).then((res) => {
      this.setState({ Stores: res.data });
    });
  }

  componentDidMount() {
    this.refreshStoresList();
    console.log(this.state.showModal);
  }

  componentDidUpdate() {
    this.refreshStoresList();
  }

  render() {
    return (
      <>
        <div>
          <CreateStore/>
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Address</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>

              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.Stores.map((c) => (
                <Table.Row key={c.id}>
                  <Table.Cell>{c.name} </Table.Cell>
                  <Table.Cell>{c.address}</Table.Cell>
                 <Table.Cell>
                 <Button basic>
                    <UpdateStore />
                  </Button>
                  <Button basic>
                    <DeleteStore id={c.id} name={c.name} address={c.address} />
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

export class DeleteStore extends Component {
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
          <Modal.Header>Delete Store</Modal.Header>
          <Modal.Content>
            <h1>
              <b>Are you sure you want to delete?</b>
            </h1>
            <h2>Name: {this.props.name}</h2>
            <h2>Price: {this.props.address}</h2>
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
                Axios.delete(`api/Stores/${this.props.id}`);
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

export class UpdateStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      address: "",
      open: false,
    };
  }
  getStorebyId(id) {
    Axios.get(`api/Stores/${id}`).then((res) => {
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
    this.getStorebyId(ids);
  }
  updateState = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = () => {
    const ids = localStorage.getItem("id");

    Axios.put(`api/Stores/${ids}`, this.state)
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        this.props.history.push("/Store");
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
          <Modal.Header>Edit the store details</Modal.Header>
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
      </div>
    );
  }
}
export default class CreateStore extends Component {
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

    Axios.post("/api/Stores", this.state)
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        this.setState({open:false})
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
          className={this.formStyles}
          onClose={() => this.setState({ open: false })}
          onOpen={() => this.setState({ open: true })}
          open={this.state.open}
          trigger={<Button color="green">Add Store</Button>}
          centered={false}
        >
          <Modal.Header>Fill in the Store Details</Modal.Header>
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
