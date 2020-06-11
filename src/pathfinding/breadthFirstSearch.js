import Queue from "./Queue.js";
import { getNeighbors } from "./util.js";

export const breadthFirstSearch = function(grid, start, finish) {

  grid.clearAllVisited();

  // Do the search and then backtrack to find the path.
  let path = [];
  let { node, visited } = bfs(grid, start, finish);  // returns the final node

  while (node.from) {
    path.push(node);
    node = node.from;
  }

  return { path: path.reverse(), visited: visited };
}

const bfs = function(grid, start, finish) {
  // Do a breadth first search on the 2D array grid and return a path from start
  // to finish as a list of

  let queue = new Queue();
  let visited = [];
  var node = start;

  queue.enqueue(node);
  node.visited = true;

  while (!queue.isEmpty()) {
    node = queue.front();
    queue.dequeue(node);
    let neighbors = getNeighbors(grid, node);
    for (var neighbor of neighbors) {
      if (!neighbor.isVisited()) {
        neighbor.visited = true;
        neighbor.from = node;
        if (neighbor.hasSameCoordinates(finish)) {
          return { node: neighbor, visited: visited };
        }
        else {
          visited.push(neighbor);
          queue.enqueue(neighbor);
        }
      }
    }
  }

  return { node: null, visited: visited };  // not found
}