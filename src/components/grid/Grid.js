// Class to contain the grid structure and logic
import Cell from "../cell/Cell.js";

class Grid {

  constructor(height, width) {
    this.sideLength = 24; // px

    const numberRows = Math.floor(height/this.sideLength);
    const numberColumns = Math.floor(width/this.sideLength);

    this.cells = [];
    for (var row=0; row<numberRows; row++) {
      const thisRow = [];
      for (var col=0; col<numberColumns; col++) {
        thisRow.push(new Cell(row, col));
      }
      this.cells.push(thisRow);
    }
  }

  getCellCoordinate(cell) {
    return {row: cell.row, column: cell.column};
    // for (var row=0; row<this.getNumberRows(); row++) {
    //   for (var col=0; col<this.getNumberColumns(); col++) {
    //     if (this.cells[row][col] === cell) {
    //       return {row: row, column: col}
    //     }
    //   }
    // }
    // return null;
  }

  getAllEmptyCellCoordinates() {
    // Get all empty cells on the grid. Returns an array of coordinate pairs.
    var emptyCells = [];
    this.cells.forEach(row => {
      const cells = row.filter(cell => cell.isEmpty());
      const coords = cells.map(cell => this.getCellCoordinate(cell));
      emptyCells = emptyCells.concat(coords);
    });

    return emptyCells;
  }

  getNumberColumns() {
    return this.cells[0]?.length;
  }

  getNumberRows() {
    return this.cells.length;
  }

  getRandomEmptyCellCoordinates() {
    const emptyCells = this.getAllEmptyCellCoordinates();
    if (!emptyCells.length) return {};

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
  }

  makeWall(row, col) {
    this.cells[row][col].type = "wall";
  }

  setCellType(row, col, type) {
    this.cells[row][col].type = type;
  }

  resize(height, width) {
    const newNumRows = Math.floor(height/this.sideLength);
    const newNumColumns = Math.floor(width/this.sideLength);

    const oldNumRows = this.getNumberRows();
    const oldNumColumns = this.getNumberColumns();

    const diffRows = newNumRows - oldNumRows;
    const diffColumns = newNumColumns - oldNumColumns;

    let newCells = this.cells.slice();

    // When shrinking, the difference in threshold (-1) is lower (than 2),
    // otherwise you get half of a row/col and overflow issues.

    if (diffRows <= -1) {
      // remove first and last rows from the old grid
      for (var i=diffRows; i<0; i++) {
        newCells.shift();
        newCells.pop();
      }
    } else if (diffRows >= 2) {
      // Add two new rows. Use old columns because we check for new columns next
      for (var i = 0; i < diffRows; i+=2) {
        newCells.unshift(new Array(oldNumColumns).fill(new Cell()));
        newCells.push(new Array(oldNumColumns).fill(new Cell()));
      }
    }

    if (diffColumns <= -1) {
      // remove first and last column
      for (var row = 0; row < newCells.length; row++) {
        newCells[row].shift();
        newCells[row].pop();
      }
    } else if (diffColumns >= 2) {
      // Add two new columns to each row
      for (var row = 0; row < newCells.length; row++) {
        for (var col = 0; col < diffColumns; col+=2) {
          newCells[row].unshift(new Cell());
          newCells[row].push(new Cell());
        }
      }
    }

    for (var row = 0; row < newCells.length; row++) {
      for (var col = 0; col < newCells[0].length; col++) {
        newCells[row][col].reposition(row, col);
      }
    }

    this.cells = newCells;
  }

  clearCellsByCoordinates(...coords) {
    for (var coord of coords) {
      this.setCellType(coord.row, coord.column, null);
    }
  }

  clearAllVisited() {
    for (var row=0; row<this.getNumberRows(); row++) {
      for (var col=0; col<this.getNumberColumns(); col++) {
        let cell = this.cells[row][col];
        cell.from = null;
        cell.visited = false;
        if (cell.isVisited()) this.setCellType(row, col, null);
        if (cell.type === "path") this.setCellType(row, col, null);
      }
    }
  }

  flatten() {
    // Returns the 2D array as a 1D array.
    return [].concat(...this.cells);
  }

}

export default Grid;
