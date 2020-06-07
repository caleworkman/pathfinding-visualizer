import Queue from "./Queue.js";
import { getAllNeighbors, isNotWall, isUnvisited } from "./util.js";


export const breadthFirstSearch = function(grid, start, finish) {
  // Do the search and then backtrack to find the path.
  let path = [];
  let node = bfs(grid, start, finish);  // returns the final node
  while (node.from) {
    path.push(node);
    node = node.from;
  }

  return path;
}

const bfs = function(grid, start, finish) {
  // Do a breadth first search on the 2D array grid and return a path from start
  // to finish as a list of

  let queue = new Queue();
  var node = start;

  queue.enqueue(node);
  node.visited = true;

  while (!queue.isEmpty()) {
    node = queue.front();
    queue.dequeue(node);
    let neighbors = getAllNeighbors(grid, node);
    for (var neighbor of neighbors) {
      if (isNotWall(neighbor) && isUnvisited(neighbor)) {
        neighbor.visited = true;
        neighbor.from = node;
        if (neighbor.row === finish.row && neighbor.column === finish.column) {
          return neighbor;
        }
        else {
          queue.enqueue(neighbor);
        }
      }
    }
  }

  return -1;  // not found
}
