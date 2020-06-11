// Generic functions to do with pathfinding

export const getNeighbors = function(grid, node) {
  // returns all the neighbors of node in grid
  // "grid" is a 2D array
  // node is a dict {row: int, column: int, type: str}

  const maxRow = grid.getNumberRows() - 1;
  const maxCol = grid.getNumberColumns() - 1;

  const row = node.row;
  const col = node.column;

  let neighbors = [];

  if (col - 1 >= 0) { neighbors.push(grid.cells[row][col - 1]); }
  if (col + 1 <= maxCol) { neighbors.push(grid.cells[row][col + 1]); }
  if (row - 1 >= 0) { neighbors.push(grid.cells[row - 1][col]); }
  if (row + 1 <= maxRow) { neighbors.push(grid.cells[row + 1][col]); }

  return neighbors.filter(node => node.type !== "wall");
}
