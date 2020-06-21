import React, { PureComponent } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./Header.css";

class Header extends PureComponent {

  render() {
    const algorithmOptions = Object.keys(this.props.dropdownOptions).map(key => {
      const algorithm = this.props.dropdownOptions[key];
      return (
        <Dropdown.Item
          key={key}
          onClick={() => this.props.onSelectAlgorithm(key)}>
          {algorithm.name}
        </Dropdown.Item>
      );
    });

    return (
      <div className="header">
        <Button onClick={this.props.reset}>
          Reset Board
        </Button>

        <DropdownButton id="dropdown-basic-button" title={this.props.selectedAlgo}>
          {algorithmOptions}
        </DropdownButton>


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

Header.defaultProps = {
  selectedAlgo: "Algorithm",
}

export default Header;
