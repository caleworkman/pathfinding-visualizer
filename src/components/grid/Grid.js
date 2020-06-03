import React, { Component } from "react";
import Cell from "../cell/Cell.js";
import "./Grid.css";

class Grid extends Component {

  getClassName(cell) {
    if (cell.type) {
      return "cell cell--" + cell.type;
    } else {
      return "cell"
    }
  }

  render() {
    const grid = this.props.grid.map((row, index) => {
      const cells = row.map(cell => {

        return (
          <Cell
            className={this.getClassName(cell)}
            key={"row" + cell.row + "col" + cell.column}
            row={cell.row}
            column={cell.column}
            onMouseDown={cell.onMouseDown}
            onMouseUp={cell.onMouseUp}
            onMouseOver={cell.onMouseOver}
          />
        )});

      return (
        <div className="grid__row" key={"row" + index}>
          {cells}
        </div>
      );
    });

    return (
      <div className="grid" ref={this.props.gridRef}>
        {grid}
      </div>
    );
  }
}

export default Grid;
