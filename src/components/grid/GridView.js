import React, { Component } from "react";
import CellView from "../cell/CellView.js";
import "./Grid.css";

class GridView extends Component {

  getClassName(cell) {
    let type = cell.type; // in case of "wall"
    const row = cell.row;
    const col = cell.column;

    if (cell.isAtPosition(this.props.start)) {
      type = "start";
    }

    if (cell.isAtPosition(this.props.finish)) {
      type = "finish";
    }

    if (type) {
      return "cell cell--" + type;
    } else {
      return "cell"
    }
  }

  render() {

    const gridComponents = this.props.cells.map((row, rowIndex) => {
      const cells = row.map((cell, colIndex) => {
        return (
          <CellView
            className={this.getClassName(cell)}
            key={"row" + rowIndex + "col" + colIndex}
            row={rowIndex}
            column={colIndex}
            onMouseDown={() => this.props.onMouseDownCell(rowIndex, colIndex)}
            onMouseUp={this.props.onMouseUp}
            onMouseOver={() => this.props.onMouseOverCell(rowIndex, colIndex)}
          />
        )});

      return (
        <div className="grid__row" key={"row" + rowIndex}>
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

export default GridView;
