// Dijkstra's Algorithm

import { getAllNeighbors, isNotWall, isUnvisited } from "./util.js";

export const findPathDijkstra = function(grid, start, finish) {
  // Uses Dijkstra's algorithm to find a path from start to finish in grid
  // All neighbors in grid are weighted to 1
  // Return a list of nodes that make up the path.

  // Assign infinity distances to all other nodes
  let visited = [];
  let unvisited = [];

  var table = {};
  for (var row=0; row<grid.length; row++) {
    for (var col=0; col<grid[0].length; col++) {
      const node = grid[row][col];
      if (isNotWall(cell)) {
        table[node] = { distance: Infinity, previous: null }
        unvisited.push(node);
      }
    }
  }

  table[start].distance = 0;

  let node = start;

  while (unvisited.length > 0) {
    const neighbors = getAllNeighbors(grid, node).filter(x => isNotWall(x);
    let cost = table[node].distance;

    const neighborCosts = neighbors.map(neighbor => table[neighbor].distance + cost)

    // Update the table with new costs
    for (var neighbor of neighbors) {
      // https://medium.com/basecs/finding-the-shortest-path-with-a-little-help-from-dijkstra-613149fbdc8e
    }
  }

}
