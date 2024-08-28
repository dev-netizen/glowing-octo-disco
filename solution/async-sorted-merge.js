"use strict";

// Print all entries, across all of the *async* sources, in chronological order.
const MinHeap = require("../lib/minHeap");

const refillMinHeap = async (logSources, minHeap, bufferLimit) => {
  await Promise.all(
    logSources.map(async (source, index) => {
      let log = await source.popAsync(); // Get the first log to check if it's last log
      let i = 0;
      while (i < bufferLimit && log) { // Drain a chunk of logs based on the buffer limit
        minHeap.insertElement({ log });
        log = await source.popAsync();
        i++;
      }
      if (!log) { // Remove logsource from sources when drained
        logSources.splice(index, 1);
      }
    })
  );
};

module.exports = async (logSources, printer) => {
  const minHeap = new MinHeap();
  let bufferLimit = 100;

  // Get initial source
  await refillMinHeap(logSources, minHeap, bufferLimit);

  // Amount of logs to print
  let concurrencyCounter = 0;
  
  while (!minHeap.isEmpty() || logSources.length !== 0) {
    if (concurrencyCounter > bufferLimit && logSources.length !== 0) { // Refill minheap
      await refillMinHeap(logSources, minHeap, bufferLimit);
      concurrencyCounter = 0;
    }
    const { log } = minHeap.popMin();
    printer.print(log);
    concurrencyCounter++;
  }

  printer.done();
  return new Promise((resolve, reject) => {
    resolve(console.log("Async sort complete."));
  });
};
