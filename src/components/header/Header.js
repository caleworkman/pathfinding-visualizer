import React, { PureComponent } from "react";
import Button from "../button/Button.js";
import "./Header.css";

class Header extends PureComponent {
  render() {
    return (
      <div className="header">
        <Button onClick={this.props.reset}>
          Reset
        </Button>
        <Button onClick={this.props.findPath}>
          Find Path
        </Button>
        <Button onClick={this.props.randomizeGrid}>
          Randomize
        </Button>
      </div>
    );
  }
}

export default Header;
