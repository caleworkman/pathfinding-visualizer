import React, { Component } from "react";
import Grid from "../components/grid/Grid.js";
import GridView from "../components/grid/GridView.js";
import Header from "../components/header/Header.js";
import './App.css';

import { breadthFirstSearch } from "../pathfinding/breadthFirstSearch.js";
import { depthFirstSearch } from "../pathfinding/depthFirstSearch.js";
import { dijkstraSearch } from "../pathfinding/dijkstra.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
      grid: new Grid(),
      start: null,
      finish: null,
      selectedAlgorithm: {}
    }

    this.gridRef = React.createRef();

    this.findPath = this.findPath.bind(this);

    this.handleMouseDownOnCell = this.handleMouseDownOnCell.bind(this);
    this.handleMouseOverCell = this.handleMouseOverCell.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleSelectAlgorithm = this.handleSelectAlgorithm.bind(this);
    this.handleResize = this.handleResize.bind(this);

    this.randomizeStartAndFinish = this.randomizeStartAndFinish.bind(this);
    this.resetGrid = this.resetGrid.bind(this);

    this.algorithms = {
      bfs: {name: "Breadth First Search", function: breadthFirstSearch},
      dfs: {name: "Depth First Search", function: depthFirstSearch},
      astar: {name: "A*", function: null},
      djikstra: {name: "Djikstra's Algorithm", function: dijkstraSearch}
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
        grid.setCellType(cell.row, cell.column, "visited");
        animationDelay += 0.03;
      }

      const lastVisited = visited[visited.length - 2]; // -1 is the finish cell
      const lastId = "row" + lastVisited.row + "col" + lastVisited.column;
      const lastElement = document.getElementById(lastId);

      const animationListener = () => this.animatePath(path, lastElement);
      lastElement.addEventListener("animationend", animationListener, {once: true});

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
        grid.setCellType(cell.row, cell.column, "path");
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

  handleMouseDownOnCell(row, col) {

    // Set this cell as a wall
    this.setState(prevState => {
      prevState.grid.setCellType(row, col, "wall");
      return { dragging: true }
    });
  }

  handleMouseOverCell(row, col) {
    if (this.state.dragging) {
      this.handleMouseDownOnCell(row, col);
    }
  }

  handleMouseUp() {
    this.setState({ dragging: false });
  }

  handleSelectAlgorithm(event) {
    const id = event.currentTarget.id;
    this.setState({
      selectedAlgorithm: this.algorithms[id]
    });
  }

  handleResize() {
    // Redraw the grid, but keep the other cells the same.
    const height = this.gridRef.current.clientHeight;
    const width = this.gridRef.current.clientWidth;
    this.setState(prevState => {
      prevState.grid.resize(height, width)
      return { grid: prevState.grid }
    });
  }

  initializeNewGrid() {
    const height = this.gridRef.current.clientHeight;
    const width = this.gridRef.current.clientWidth;
    return new Grid(height, width);
  }

  randomizeStartAndFinish() {
    let grid = this.state.grid;

    // Clear old start and finish if they exist
    if (this.state.start) grid.clearCellsByCoordinates(this.state.start);
    if (this.state.finish) grid.clearCellsByCoordinates(this.state.finish);

    // Find new start and finish
    const start = grid.getRandomEmptyCellCoordinates();
    grid.setCellType(start.row, start.column, "start");
    const finish = grid.getRandomEmptyCellCoordinates();
    grid.setCellType(finish.row, finish.column, "finish");

    this.setState({ start: start, finish: finish });
  }

  resetGrid() {
    this.setState({
      grid: this.initializeNewGrid(),
      start: null,
      finish: null
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
        <GridView
          grid={this.state.grid}
          gridRef={this.gridRef}
          start={this.state.start}
          finish={this.state.finish}
          onMouseDownCell={this.handleMouseDownOnCell}
          onMouseOverCell={this.handleMouseOverCell}
          onMouseUp={this.handleMouseUp}
        />
      </div>
    );
  }
}

export default App;
