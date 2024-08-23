"use strict";

// Print all entries, across all of the sources, in chronological order.

const MinHeap = require("../lib/minHeap");

module.exports = (logSources, printer) => {
  const minHeap = new MinHeap();

  logSources.forEach((source) => {
    const log = source.pop(); // Get first log
    if (log) {
      minHeap.insertElement({ log, source }); // Insert to Heap structure
    }
  });

  while (!minHeap.isEmpty()) { 
    const { log, source } = minHeap.popMin();
    printer.print(log);

    // Fetch the next log from the same source
    const nextLog = source.pop();
    if (nextLog) {
      minHeap.insertElement({ log: nextLog, source }); // Get the next log from corresponding source
    }
  }
  printer.done()
  return console.log("Sync sort complete.");
};
