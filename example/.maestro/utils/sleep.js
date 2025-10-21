// Helper script to sleep for a specified duration
// Using busy-wait loop since setTimeout is not available in Maestro JS environment
// Reference: https://github.com/mobile-dev-inc/Maestro/issues/1542#issuecomment-2153036301

var ms = parseInt(output.sleepMs || "12000");
var start = Date.now();

while (Date.now() - start < ms) {
  // Busy wait
}

console.log("Slept for " + ms + "ms");