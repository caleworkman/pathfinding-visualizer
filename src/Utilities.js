export const removeFromArray = function(arr, removeCoord) {
  const index = arr.indexOf(removeCoord);
  arr.splice(index, 1)
}
