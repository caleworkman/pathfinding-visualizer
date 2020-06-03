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
      grid: [],
      dragging: false
    }

    this.gridRef = React.createRef();

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);

    this.getNumberColumns = this.getNumberColumns.bind(this);
    this.getNumberRows = this.getNumberRows.bind(this);
    this.randomizeStartAndFinish = this.randomizeStartAndFinish.bind(this);
  }

  componentDidMount() {
    this.initializeNewGrid();
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
          type: null,
          onMouseDown: this.handleMouseDown,
          onMouseUp: this.handleMouseUp,
          onMouseOver: this.handleMouseOver
        });
      }
      newGrid.push(row);
    }

    this.setState({ grid: newGrid });
  }

  handleMouseDown(cell) {
    const row = cell.currentTarget.dataset.row;
    const col = cell.currentTarget.dataset.column;
    // Set this cell as a wall
    const _grid = this.state.grid.slice();
    _grid[row][col].type = "wall";

    this.setState({ dragging: true, grid: _grid });
  }

  handleMouseOver(cell) {
    if (this.state.dragging) {
      const row = cell.currentTarget.dataset.row;
      const col = cell.currentTarget.dataset.column;
      const _grid = this.state.grid.slice();
      _grid[row][col].type = "wall";
      this.setState({ grid: _grid });
    }
  }

  handleMouseUp(cell) {
    this.setState({ dragging: false });
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

    this.setState({ grid: _grid });
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
