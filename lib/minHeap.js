/**
 * Min-Heap is a data structure where each node is smaller or equal to its children
 * In this case since the order is chronological and from various sources this data structure is best for performance and efficiency
 * Note: Since is a code challenge I am implementing the MinHeap myself and not using a third party
 */
module.exports = class MinHeap {
  constructor() {
    this.heap = [];
  }

  insertElement(element) {
    this.heap.push(element); // Inserting new element
    this.heapifyUp(); // Restore heap state when inserting
  }

  popMin() {
    // Return only element
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0]; // Popping the first element since it is the earliest date
    this.heap[0] = this.heap.pop(); // Moves last element to the root
    this.heapifyDown(); // Restore heap state when extracting
    return min;
  }

  // Starts with the latest inserted element
  heapifyUp() {
    let index = this.heap.length - 1; // Get the last element
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2); // This is the formula for getting a parent index when using arrays as a heap structure
      if (this.heap[parentIndex].log.date <= this.heap[index].log.date) break; // Stop if the date is later or equal to the parent
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ]; // Swap with the parent since the date is later than the parent
      index = parentIndex; // Change to the parent index since it's the current later element
    }
  }

  // Starts with the root element
  heapifyDown() {
    let index = 0; // Get first element
    while (2 * index + 1 < this.heap.length) {
      // This is the formula for getting a child index when using arrays as a heap structure
      let leftChildIndex = 2 * index + 1; // Gets the leftChild
      let rightChildIndex = 2 * index + 2; // Gets the rightChild
      let smallerChildIndex =
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex].log.date <
          this.heap[leftChildIndex].log.date
          ? rightChildIndex
          : leftChildIndex; // If the right child exists and is earlier than the left child get the right child index
      if (this.heap[index].log.date <= this.heap[smallerChildIndex].log.date)
        break; // Stop if the current element is earlier than the earliest child
      [this.heap[index], this.heap[smallerChildIndex]] = [
        this.heap[smallerChildIndex],
        this.heap[index],
      ]; // Swap with the earlier child
      index = smallerChildIndex; // Change to the child index since it's the current earlier element
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
};
