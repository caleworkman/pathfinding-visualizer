import {
  clearVisited,
  getNeighbors,
  hasVisited,
  isEqual } from "./util.js";

export const depthFirstSearch = function(grid, start, finish) {

  clearVisited(grid);

  let path = [];
  let visited = [];
  const _start = grid[start.row][start.column]; // start is just a {row, col} pair
  return {
    path: dfs(grid, _start, finish, path, visited),
    visited: visited
  };
}

const dfs = function(grid, start, finish, path, visited) {

  start.visited = true;
  visited.push(start);
  if (isEqual(start, finish)) return path;

  let neighbors = getNeighbors(grid, start).filter(x => !hasVisited(x));
  for (var neighbor of neighbors) {
    var p = dfs(grid, neighbor, finish, path.concat(start), visited);
    if (p.length > 0) return p;
  };
  return [];
}
