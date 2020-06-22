import { getNeighbors } from "./util.js";

export const astarSearch = function(grid, startCoord, finishCoord) {
  grid.clearAllVisited();

  const start = grid.cells[startCoord.row][startCoord.column];
  const finish = grid.cells[finishCoord.row][finishCoord.column];

  let open = [start]; // candidates to visit
  let closed = [];    // candidates that have been visited

  let node = start;
  node.g = 0;
  let index = 0;
  while (!node.isAtPosition(finish)) {
    open.splice(node.indexInArray(open), 1);
    closed.push(node);
    astar(grid, node, open, closed, finish);
    node = findLeastF(open);
  }

  // Backtrack from the finish node to get the path
  let path = [];
  node = finish;
  while (node.from) {
    node = node.from;
    path.push(node)
  }

  return {path: path.reverse(), visited: closed};
}


const astar = function(grid, node, open, closed, finish) {
  // Examine neighbors
  let neighbors = getNeighbors(grid, node);
  const pathWeight = 1; // A grid has equal weights to all neighbors
  for (var neighbor of neighbors) {
    let cost = node.g + pathWeight;

    if (neighbor.isInArray(open) && (cost < neighbor.g)) {
      // remove neighbor from open because new path is better
      let neighborIndex = open.findIndex(n => n.isAtPosition(neighbor));
      open.splice(neighborIndex, 1);
    }

    if (!neighbor.isInArray(open) && !neighbor.isInArray(closed)) {
      neighbor.g = cost;
      neighbor.f = neighbor.g + manhattanDistance(neighbor, finish);
      neighbor.from = node;
      open.push(neighbor);
    }
  }
}

const findLeastF = function(nodes) {
  let minNode = nodes[0];
  for (var node of nodes) {
    if (node.f < minNode.f) {
      minNode = node;
    }
  }
  return minNode;
}

const manhattanDistance = function(node, finish) {
  // Used when only four directions are allowed
  return Math.abs(node.row - finish.row) + Math.abs(node.column - finish.column);
}

const euclideanDistance = function(node, finish) {
  // Use when allowed to move in all 8 directions
  return Math.sqrt((node.row - finish.row)^2 + (node.column - finish.column)^2);
}
