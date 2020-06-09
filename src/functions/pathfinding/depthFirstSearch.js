import {
  clearVisited,
  getNeighbors,
  hasVisited } from "./util.js";

export const depthFirstSearch = function(grid, start, finish) {

  clearVisited(grid);

  let path = [];
  let visited = [];
  return {
    path: dfs(grid, start, finish, path, visited),
    visited: visited
  };
}

const dfs = function(grid, start, finish, path, visited) {

  start.visited = true;
  visited.push(start);
  if (start.row === finish.row && start.column === finish.column) {
    return path.concat(start);
  } else {
    for (var neighbor of getNeighbors(grid, start)) {
      if (!hasVisited(neighbor)) {
        var p = dfs(grid, neighbor, finish, path.concat(start), visited);
        if (p.length > 0) { return p; }
      }
    }
    return [];
  }
}
