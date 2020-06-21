import React, { Component } from "react";
import CellView from "../cell/CellView.js";
import "./Grid.css";

class GridView extends Component {

  getType(cell) {
    if (cell.isAtPosition(this.props.start)) return "start";
    if (cell.isAtPosition(this.props.finish)) return "finish";
    return cell.type; // returns "wall" for now
  }

  render() {

    const gridComponents = this.props.cells.map((row, rowIndex) => {
      const cells = row.map((cell, colIndex) => {
        return (
          <CellView
            type={this.getType(cell)}
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
