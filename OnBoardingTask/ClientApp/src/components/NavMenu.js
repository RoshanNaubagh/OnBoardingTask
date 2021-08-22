import React, { Component } from "react";

import { Link } from "react-router-dom";
import "./NavMenu.css";
import { Menu } from "semantic-ui-react";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <div style={{paddingTop:20,paddingBottom:30,alignItems:'left'}}>
        <Menu borderless style={{backgroundColor:'blue'}}>
          <Menu.Item>
            <Link tag={Link} className="text-dark" to="/">
              Home
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link tag={Link} className="text-dark" to="/Customer">
              Customer
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link tag={Link} className="text-dark" to="/Product">
              Product
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link tag={Link} className="text-dark" to="/Store">
              Store
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link tag={Link} className="text-dark" to="/Sale">
              Sale
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
