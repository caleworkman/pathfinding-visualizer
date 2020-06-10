import React, { Component } from "react";
import ReactDOM from 'react-dom'
import Grid from "../components/grid/Grid.js";
import Header from "../components/header/Header.js";
import './App.css';

import { generateRandomNumberUpTo } from "../Utilities.js";
import { breadthFirstSearch } from "../functions/pathfinding/breadthFirstSearch.js";
import { depthFirstSearch } from "../functions/pathfinding/depthFirstSearch.js";

const CELL_SIDE_LENGTH = 24; // px

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
      grid: [],
      start: null,
      finish: null,
      selectedAlgorithm: {}
    }

    this.gridRef = React.createRef();

    this.findPath = this.findPath.bind(this);

    this.getNumberColumns = this.getNumberColumns.bind(this);
    this.getNumberRows = this.getNumberRows.bind(this);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleSelectAlgorithm = this.handleSelectAlgorithm.bind(this);
    this.handleResize = this.handleResize.bind(this);

    this.expandToNewGrid = this.expandToNewGrid.bind(this);

    this.randomizeStartAndFinish = this.randomizeStartAndFinish.bind(this);
    this.resetGrid = this.resetGrid.bind(this);

    this.algorithms = {
      bfs: {name: "Breadth First Search", function: breadthFirstSearch},
      dfs: {name: "Depth First Search", function: depthFirstSearch},
      astar: {name: "A*", function: null},
      djikstra: {name: "Djikstra\'s Algorithm", function: null}
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.setState({ grid: this.initializeNewGrid() });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  animateSearching(visited, path) {

    this.setState(prevState => {
      let grid = prevState.grid;
      var animationDelay = 0;
      for (var cell of visited) {
        const id = "row" + cell.row + "col" + cell.column;
        const element = document.getElementById(id);
        element.style.animationDelay = animationDelay + "s";
        grid[cell.row][cell.column].type = "visited";
        animationDelay += 0.03;
      }

      const lastVisited = visited[visited.length - 2]; // -1 is the finish cell
      const lastId = "row" + lastVisited.row + "col" + lastVisited.column;
      const lastElement = document.getElementById(lastId);
      lastElement.addEventListener("animationend", () => this.animatePath(path, lastElement));

      return { grid: grid }
    });
  }

  animatePath(path, lastElement) {
    this.setState(prevState => {
      let grid = prevState.grid;
      var animationDelay = 0;
      path.forEach(cell => {
        const id = "row" + cell.row + "col" + cell.column;
        const element = document.getElementById(id);
        element.style.animationDelay = animationDelay + "s";
        grid[cell.row][cell.column].type = "path";
        animationDelay += 0.03;
      });
      return { grid: grid }
    });
  }

  findPath() {
    if (!this.state.start || !this.state.finish) {
      console.log("no start or finish");
      return;
    }

    const searchFunction = this.state.selectedAlgorithm.function;
    if (!searchFunction) {
      console.log("Please select an algorithm.");
      return;
    }
    const { path, visited } = searchFunction(this.state.grid, this.state.start, this.state.finish);
    this.animateSearching(visited, path);
  }

  getAllEmptyCellCoordsFrom(grid) {
    // Get all empty cells on the grid.
    // Returns an array of {row: int, column: int} pairs.
    var emptyCells = [];
    grid.forEach(row => {
      const cells = row.filter(cell => !cell.type);
      const coords = cells.map(cell => {return {row: cell.row, column: cell.column}});
      emptyCells = emptyCells.concat(coords);
    });

    return emptyCells;
  }

  getNumberColumns() {
    return this.state.grid[0]?.length;
  }

  getNumberRows() {
    return this.state.grid.length;
  }

  getRandomValueFrom(arr) {
    if (!arr.length) {
      // TODO: proper error handling
      console.log("Error: Array passed to getRandomValueFrom(arr) is empty.");
      return [];
    }

    return arr[generateRandomNumberUpTo(arr.length)];
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

  handleSelectAlgorithm(event) {
    const id = event.currentTarget.id;
    this.setState({
      selectedAlgorithm: this.algorithms[id]
    });
  }

  handleResize() {
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
          visited: false,
          onMouseDown: this.handleMouseDown,
          onMouseUp: this.handleMouseUp,
          onMouseOver: this.handleMouseOver,
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

    const newGrid = this.state.grid.slice();

    // When shrinking, the difference in threshold (-1) is lower (than 2),
    // otherwise you get half of a row/col and overflow issues.

    if (diffRows <= -1) {
      // remove first and last rows from the old grid
      for (var i=diffRows; i<0; i++) {
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

    if (diffColumns <= -1) {
      // remove first and last column
      for (var row=0; row<newGrid.length; row++) {
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
        newGrid[row][col] = {
          row: row,
          column: col,
          type: newGrid[row][col]?.type,
          onMouseDown: this.handleMouseDown,
          onMouseUp: this.handleMouseUp,
          onMouseOver: this.handleMouseOver
        }
      }
    }

    return newGrid;
  }

  randomizeStartAndFinish() {

    var emptyCells = this.getAllEmptyCellCoordsFrom(this.state.grid);
    const start = this.getRandomValueFrom(emptyCells);
    this.removeFromArray(emptyCells, start);
    const finish = this.getRandomValueFrom(emptyCells);

    this.setState({
      start: start,
      finish: finish
    });
  }

  removeFromArray(arr, removeCoord) {
    const index = arr.indexOf(removeCoord);
    arr.splice(index, 1)
  }

  resetGrid() {
    this.setState({
      grid: this.initializeNewGrid(),
      start: {row: null, column: null},
      finish: {row: null, column: null}
    });
  }

  render() {
    return (
      <div className="app">
        <Header
          findPath={this.findPath}
          dropdownOptions={this.algorithms}
          onSelectAlgorithm={this.handleSelectAlgorithm}
          selectedAlgo={this.state.selectedAlgorithm.name}
          randomizeGrid={this.randomizeStartAndFinish}
          reset={this.resetGrid}
        />
        <Grid
          grid={this.state.grid}
          gridRef={this.gridRef}
          start={this.state.start}
          finish={this.state.finish}
        />
      </div>
    );
  }
}

export default App;
