import React, { Component } from "react";
import Grid from "../components/grid/Grid.js";
import Header from "../components/header/Header.js";
import './App.css';

import {generateRandomNumberUpTo} from "../Utilities.js";

const CELL_SIDE_LENGTH = 24; // px

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: []
    }

    this.gridRef = React.createRef();

    this.handleClickCell = this.handleClickCell.bind(this);
    this.getNumberColumns = this.getNumberColumns.bind(this);
    this.getNumberRows = this.getNumberRows.bind(this);
    this.randomizeStartAndFinish = this.randomizeStartAndFinish.bind(this);
  }

  componentDidMount() {
    this.initializeNewGrid();
    // this.randomizeStart();
  }

  initializeNewGrid() {
    const height = this.gridRef.current.clientHeight;
    const width = this.gridRef.current.clientWidth;

    const gridHeightInCells = Math.floor(height/CELL_SIDE_LENGTH);
    const gridWidthInCells = Math.floor(width/CELL_SIDE_LENGTH);

    let newGrid = [];
    for (var i=0; i<gridHeightInCells; i++) {
      const row = [];
      for (var j=0; j<gridWidthInCells; j++) {
        row.push({
          row: i,
          column: j,
          onClick: this.handleClickCell,
          type: null
        });
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

  getNumberColumns() {
    return this.state.grid[0].length;
  }

  getNumberRows() {
    return this.state.grid.length;
  }

  randomizeStartAndFinish() {
    // Set a random cell to start and a random cell to finish
    const numCols = this.getNumberColumns();
    const numRows = this.getNumberRows();

    const startRow = generateRandomNumberUpTo(numRows);
    const startCol = generateRandomNumberUpTo(numCols);

    // Make sure start and finish aren't the same
    var finishRow = generateRandomNumberUpTo(numRows);
    var finishCol = generateRandomNumberUpTo(numCols);
    while (finishRow === startRow) {
      finishRow = generateRandomNumberUpTo(numRows);
    }
    while (finishCol === startCol) {
      finishCol = generateRandomNumberUpTo(numCols);
    }

    const _grid = this.state.grid.slice();
    _grid[startRow][startCol].type = "start";
    _grid[finishRow][finishCol].type = "finish"

    this.setState({
      grid: _grid
    });
  }

  render() {
    return (
      <div className="app">
        <Header randomizeGrid={this.randomizeStartAndFinish} />
        <Grid
          grid={this.state.grid}
          gridRef={this.gridRef}
        />
      </div>
    );
  }
}

export default App;
