import React, { Component } from "react";
import Cell from "../cell/Cell.js";
import "./Grid.css";

class Grid extends Component {

  getClassName(cell) {
    let type = cell.type; // in case of "wall"
    const row = cell.row;
    const col = cell.column;

    const startRow = this.props.start.row ?? null;
    const startCol = this.props.start.column ?? null;
    if (row === startRow && col === startCol) {
      type = "start";
    }

    const finishRow = this.props.finish.row ?? null;
    const finishCol = this.props.finish.column ?? null;
    if (row === finishRow && col === finishCol) {
      type = "finish";
    }

    if (type) {
      return "cell cell--" + type;
    } else {
      return "cell"
    }
  }

  render() {

    const gridComponents = this.props.grid.map((row, index) => {
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
        {gridComponents}
      </div>
    );
  }
}

export default Grid;
