import React, { Component } from "react";
import Cell from "../cell/Cell.js";
import "./Grid.css";

const CELL_SIDE_LENGTH = 24; // px

class Grid extends Component {

  constructor(props) {
    super(props);

    this.state = {
      grid: []
    }

    this.handleClickCell = this.handleClickCell.bind(this);
  }

  componentDidMount() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const gridWidthInCells = Math.floor(width/CELL_SIDE_LENGTH) - 2;
    const gridHeightInCells = Math.floor(height/CELL_SIDE_LENGTH) - 2;

    let newGrid = [];
    for (var i=0; i<gridHeightInCells; i++) {
      const row = [];
      for (var j=0; j<gridWidthInCells; j++) {
        row.push(
          <Cell
            row={i}
            column={j}
            click={this.handleClickCell}
            key={"row"+i+"col"+j}
          />
        );
      }
      newGrid.push(row);
    }

    this.setState({
      grid: newGrid
    });
  }

  handleClickCell(cell) {
    const row = cell.currentTarget.dataset.row;
    const col = cell.currentTarget.dataset.column;
    console.log(row, col);
  }

  render() {
    const cells = this.state.grid.map((row, index) => {
      return (
        <div className="grid__row" key={"row"+index}>
          {row}
        </div>
      );
    });

    return (
      <div className="grid">
        {cells}
      </div>
    );
  }
}

export default Grid;
