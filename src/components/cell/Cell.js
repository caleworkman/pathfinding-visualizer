import React, { Component } from "react";
import "./Cell.css";

class Cell extends Component {
  render() {
    return (
      <div
        className={this.props.className}
        data-row={this.props.row}
        data-column={this.props.column}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
      />
    );
  }
}

export default Cell;
