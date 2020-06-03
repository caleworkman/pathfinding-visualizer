import React, { Component } from "react";
import "./Cell.css";

class Cell extends Component {
  render() {
    return (
      <div
        className={this.props.className}
        onClick={this.props.onClick}
        data-row={this.props.row}
        data-column={this.props.column}
      />
    );
  }
}

export default Cell;
