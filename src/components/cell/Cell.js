import React, { PureComponent } from "react";
import "./Cell.css";

class Cell extends PureComponent {
  render() {
    return (
      <div
        className={this.props.className}
        data-row={this.props.row}
        data-column={this.props.column}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        id={"row"+this.props.row+"col"+this.props.column}
      />
    );
  }
}

Cell.defaultProps = {
  className: "cell",
}

export default Cell;
