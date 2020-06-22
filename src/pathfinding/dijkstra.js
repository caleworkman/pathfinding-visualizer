// Dijkstra's Algorithm
// Finds the shortest path but has to visit all the nodes to do so

import { getNeighbors } from "./util.js";
import { bfs } from "./breadthFirstSearch.js";

export const dijkstraSearch = function(grid, startCoord, finishCoord) {
  // All neighbors in grid are weighted to 1

  grid.clearAllVisited();

  let visited = [];
  prepareGrid(grid);

  const start = grid.cells[startCoord.row][startCoord.column];
  const finish = grid.cells[finishCoord.row][finishCoord.column];

  // Do a BFS to find all the reachable cells from the start. Use a null
  // as the finish coordinate to ensure it searches all nodes.
  let nullCoord = {row: null, column: null};
  let unvisited = bfs(grid, start, nullCoord).visited;

  start.distance = 0;
  start.from = null;
  while (unvisited.length > 0) {
    dijkstra(grid, visited, unvisited);
  }

  // Backtrack from the finish node to get the path
  let path = [];
  let node = finish;
  while (node.from) {
    node = node.from;
    path.push(node)
  }

  return {path: path.reverse(), visited: visited};
}

const dijkstra = function(grid, visited, unvisited) {
  // Recursive function to perform the Dijkstra algorithm at each step
  let {node, index} = getNodeWithShortestPath(unvisited);

  const pathWeight = 1; // A grid has equal weights to all neighbors
  let neighbors = getNeighbors(grid, node);
  neighbors.forEach(neighbor => {
    if (node.distance + pathWeight < neighbor.distance) {
      neighbor.from = node;
      neighbor.distance = node.distance + pathWeight
    }
  });
  visited.push(node);
  unvisited.splice(index, 1);
}

const getNodeWithShortestPath = function(unvisited) {
  // Return the node with the shortest distance (from the start)
  let minIndex = 0;
  let minNode = unvisited[minIndex];
  for (var i = 0; i < unvisited.length; i++) {
    const node = unvisited[i];
    if (node.distance < minNode.distance) {
      minNode = node;
      minIndex = i;
    }
  }
  return {node: minNode, index: minIndex};
}

const prepareGrid = function(grid) {
  // Initialize grid for Dijkstra's algorithm by setting all distances to
  // infinity and setting a previousVertex attribute to null
  for (var row = 0; row < grid.getNumberRows(); row++) {
    for (var col = 0; col < grid.getNumberColumns(); col++) {
      let cell = grid.cells[row][col];
      cell.from = null;
      cell.distance = Infinity;
    }
  }
}
