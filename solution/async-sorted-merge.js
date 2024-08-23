"use strict";

// Print all entries, across all of the *async* sources, in chronological order.
const MinHeap = require("../lib/minHeap");

module.exports = async (logSources, printer) => {
  const minHeap = new MinHeap();

  // Get each source asynchronously
  await Promise.all(
    logSources.map(async (source) => {
      let log = await source.popAsync(); // Get the first log
      while (log) { // Drain all logs from the source
        minHeap.insertElement({ log }); 
        log = await source.popAsync();
      }
    })
  );

  // Process the heap until all logs are printed
  while (!minHeap.isEmpty()) {
    const { log } = minHeap.popMin();
    printer.print(log);
  }
  printer.done()
  return new Promise((resolve, reject) => {
    resolve(console.log("Async sort complete."));
  });
};
