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

    this.getNumberColumns = this.getNumberColumns.bind(this);
    this.getNumberRows = this.getNumberRows.bind(this);

    this.handleResize = this.handleResize.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);

    this.expandToNewGrid = this.expandToNewGrid.bind(this);
    this.initializeNewGrid = this.initializeNewGrid.bind(this);

    this.randomizeStartAndFinish = this.randomizeStartAndFinish.bind(this);
    this.resetGrid = this.resetGrid.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.setState({ grid: this.initializeNewGrid() });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  getNumberColumns() {
    return this.state.grid[0].length;
  }

  getNumberRows() {
    return this.state.grid.length;
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

  handleResize() {


    // TODO: need to renumber the new grid based on its changes
    this.setState({ grid: this.expandToNewGrid() });
  }

  initializeNewGrid() {
    const height = this.gridRef.current.clientHeight;
    const width = this.gridRef.current.clientWidth;

    const numberRows = Math.floor(height/CELL_SIDE_LENGTH);
    const numberColumns = Math.floor(width/CELL_SIDE_LENGTH);

    let newGrid = [];
    for (var i=0; i<numberRows; i++) {
      const row = [];
      for (var j=0; j<numberColumns; j++) {
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

    return newGrid;
  }

  expandToNewGrid() {

    // Redraw the grid, but keep the other cells the same.
    const height = this.gridRef.current.clientHeight;
    const width = this.gridRef.current.clientWidth;

    const newNumRows = Math.floor(height/CELL_SIDE_LENGTH);
    const newNumColumns = Math.floor(width/CELL_SIDE_LENGTH);

    const oldNumRows = this.getNumberRows();
    const oldNumColumns = this.getNumberColumns();

    const diffRows = newNumRows - oldNumRows;
    const diffColumns = newNumColumns - oldNumColumns;

    console.log(diffColumns);

    const newGrid = this.state.grid.slice();

    if (diffRows <= -2) {
      // remove first and last rows from the old grid
      for (var i=diffRows; i<0; i+=2) {
        newGrid.shift();
        newGrid.pop();
      }
    } else if (diffRows >= 2) {
      // Add two new rows. Use old columns because we check for new columns next
      for (var i=0; i<diffRows; i+=2) {
        newGrid.unshift(new Array(oldNumColumns));
        newGrid.push(new Array(oldNumColumns));
      }
    }

    if (diffColumns <= -2) {
      // remove first and last column
      for (var row=0; row<newGrid.length; row+=2) {
        newGrid[row].shift();
        newGrid[row].pop();
      }
    } else if (diffColumns >= 2) {
      // Add two new columns to each row
      for (var row=0; row<newGrid.length; row++) {
        for (var col=0; col<diffColumns; col+=2) {
          newGrid[row].unshift({});
          newGrid[row].push({});
        }
      }
    }

    for (var row=0; row<newGrid.length; row++) {
      for (var col=0; col<newGrid[0].length; col++) {
        let cell = newGrid[row][col];
        if (cell) {
          cell.row = row;
          cell.column = col;
        } else {
          newGrid[row][col] = {
            row: row,
            column: col,
            type: null,
            onMouseDown: this.handleMouseDown,
            onMouseUp: this.handleMouseUp,
            onMouseOver: this.handleMouseOver
          }
        }
      }
    }

    return newGrid;
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

  resetGrid() {
    this.setState({ grid: this.initializeNewGrid() });
  }

  render() {
    return (
      <div className="app">
        <Header
          randomizeGrid={this.randomizeStartAndFinish}
          reset={this.resetGrid}
        />
        <Grid
          grid={this.state.grid}
          gridRef={this.gridRef}
        />
      </div>
    );
  }
}

export default App;
