// Generic functions to do with pathfinding

export const getAllNeighbors = function(grid, node) {
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

  return neighbors;
}

export const isNotWall = function(node) {
  return node.type !== "wall";
}

export const isUnvisited = function(node) {
  return !node.visited;
}
