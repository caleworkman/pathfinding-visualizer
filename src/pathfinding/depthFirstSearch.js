import { getNeighbors } from "./util.js";

export const depthFirstSearch = function(grid, start, finish) {

  grid.clearAllVisited();

  let path = [];
  let visited = [];
  const _start = grid.cells[start.row][start.column]; // start is just a {row, col} pair
  return {
    path: dfs(grid, _start, finish, path, visited),
    visited: visited
  };
}

const dfs = function(grid, start, finish, path, visited) {

  start.visited = true;
  visited.push(start);
  if (start.hasSameCoordinates(finish)) return path;

  let neighbors = getNeighbors(grid, start).filter(cell => !cell.isVisited());
  for (var neighbor of neighbors) {
    var p = dfs(grid, neighbor, finish, path.concat(start), visited);
    if (p.length > 0) return p;
  };
  return [];
}

// TODO; something is happening with DFS when the path isv ery long
// 6/16/20: not sure what this meant
