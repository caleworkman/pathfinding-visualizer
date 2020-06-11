// Generic functions to do with pathfinding

export const getNeighbors = function(grid, node) {
  // returns all the neighbors of node in grid
  // "grid" is a 2D array
  // node is a dict {row: int, column: int, type: str}

  const maxRow = grid.length - 1;
  const maxCol = grid[0].length - 1;

  const row = node.row;
  const col = node.column;

  let neighbors = [];

  if (col - 1 >= 0) { neighbors.push(grid[row][col - 1]); }
  if (col + 1 <= maxCol) { neighbors.push(grid[row][col + 1]); }
  if (row - 1 >= 0) { neighbors.push(grid[row - 1][col]); }
  if (row + 1 <= maxRow) { neighbors.push(grid[row + 1][col]); }

  return neighbors.filter(node => node.type !== "wall");
}

export const hasVisited = function(node) {
  return node.visited;
}

export const clearVisited = function(grid) {
  for (var row=0; row<grid.length; row++) {
    for (var col=0; col<grid[0].length; col++) {
      grid[row][col].visited = false;
    }
  }
}

export const isEqual = function(a, b) {
  return a.row === b.row && a.column === b.column;
}
