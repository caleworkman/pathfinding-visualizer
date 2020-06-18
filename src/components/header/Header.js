import React, { PureComponent } from "react";
import Button from "../button/Button.js";
import Dropdown from "../dropdown/Dropdown.js";
import "./Header.css";

class Header extends PureComponent {
  render() {
    return (
      <div className="header">
        <Button onClick={this.props.reset}>
          Reset
        </Button>
        <Dropdown
          options={this.props.dropdownOptions}
          selected={this.props.selectedAlgo}
          onSelect={this.props.onSelectAlgorithm}
        />
        <Button onClick={this.props.findPath}>
          Find Path
        </Button>
        <Button onClick={this.props.randomizeGrid}>
          Randomize
        </Button>

        <Button onClick={this.props.clearPath}>
          Clear Path
        </Button>
      </div>
    );
  }
}

export default Header;
