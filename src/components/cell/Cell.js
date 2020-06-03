import React, { Component } from "react";
import "./Cell.css";

class Cell extends Component {
  render() {
    return (
      <div
        className="cell"
        onClick={this.props.click}
        data-row={this.props.row}
        data-column={this.props.column}
      />
    );
  }
}

export default Cell;
