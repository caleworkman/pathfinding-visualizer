import React, { Component } from "react";
import Grid from "../components/grid/Grid.js";
import GridView from "../components/grid/GridView.js";
import Header from "../components/header/Header.js";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      selectedAlgorithm: {},
      warning: ""
    }

    this.gridRef = React.createRef();

    this.clearWarning = this.clearWarning.bind(this);

    this.clearPath = this.clearPath.bind(this);
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

  clearWarning() {
    this.setState({ warning: null });
  }

  animateSearching(visited, path) {

    if (visited) {
      this.visitInterval = setInterval(
        () => this.visitNextCell(visited, path),
        50
      );
    }
  }

  visitNextCell(visited, path) {
    const cell = visited.shift();
    cell.visit();
    this.forceUpdate();

    if (visited.length === 0) {
      clearInterval(this.visitInterval);

      if (visited) {
        this.pathInterval = setInterval(
          () => this.visitPathCell(path),
          50
        );
      }
    }
  }

  visitPathCell(path) {
    const cell = path.shift();
    cell.path();
    this.forceUpdate();

    if (path.length === 0) {
      clearInterval(this.pathInterval);
    }
  }

  clearPath() {
    this.setState(prevState => {
      let newGrid = prevState.grid;
      newGrid.clearAllVisited();
      return {grid: newGrid}
    })
  }

  findPath() {
    const { grid, start, finish } = this.state;

    if (!start || !finish) {
      this.setState({ warning: "Please select a start or finish."})
      return;
    }

    const searchFunction = this.state.selectedAlgorithm.function;
    if (!searchFunction) {
      this.setState({ warning: "Please select an algorithm."})
      return;
    }

    const { path, visited } = searchFunction(grid, start, finish);
    this.animateSearching(visited, path);
  }

  handleMouseDownOnCell(row, col) {

    // Set this cell as a wall
    this.setState(prevState => {
      prevState.grid.makeWall(row, col);
      return {dragging: true }
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

  handleSelectAlgorithm(key) {
    this.setState({
      selectedAlgorithm: this.algorithms[key]
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
          clearPath={this.clearPath}
          findPath={this.findPath}
          dropdownOptions={this.algorithms}
          onSelectAlgorithm={this.handleSelectAlgorithm}
          selectedAlgo={this.state.selectedAlgorithm.name}
          randomizeGrid={this.randomizeStartAndFinish}
          reset={this.resetGrid}
        />

        <GridView
          {...this.state.grid}
          gridRef={this.gridRef}
          start={this.state.start}
          finish={this.state.finish}
          onMouseDownCell={this.handleMouseDownOnCell}
          onMouseOverCell={this.handleMouseOverCell}
          onMouseUp={this.handleMouseUp}
        />

        <Modal
          centered
          backdrop
          show={this.state.warning}
          onHide={this.clearWarning}>
          <Modal.Body className="modal__body">
            {this.state.warning}
            <Button
              variant="primary"
              onClick={this.clearWarning}>
              OK
            </Button>
          </Modal.Body>
        </Modal>

      </div>
    );
  }
}

export default App;
