export default class Cell {
  constructor(row, col, type=null, visited=false) {
    this.row = row;
    this.column = col;
    this.from = null;
    this.type = type;
    this.visited = visited
  }

  isEmpty() {
    return !this.type;
  }

  isInArray(array) {
    return array.some(n => n.isAtPosition(this));
  }

  indexInArray(array) {
    return array.findIndex(cell => (cell.isAtPosition(this)));
  }

  isVisited() {
    return this.visited;
  }

  reposition(newRow, newColumn) {
    this.row = newRow;
    this.column = newColumn;
  }

  isAtPosition(other) {
    if (!other) return false;
    if (!("row" in other) || !("column" in other)) return false;
    return this.row === other.row && this.column === other.column;
  }

  path() {
    this.type = "path";
  }

  visit() {
    this.type = "visited";
  }

}
