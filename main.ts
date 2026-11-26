import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The funniest weather forecast for a city that does not exist.
// Brollywick is invented: its rain falls only on people who forgot
// an umbrella, and the Met Office has given that a bureaucratic name.
const FORECAST =
  "In Brollywick, rain falls only on people who forgot umbrellas. The Met Office calls it targeted precipitation.";

// The gate reads /output/entry.txt: UTF-8 text of 1 to 120 characters,
// not only white space. Refuse to write anything that fails the gate.
if (FORECAST.length < 1 || FORECAST.length > 120) {
  throw new Error(`forecast is ${FORECAST.length} characters, must be 1-120`);
}
if (FORECAST.trim().length === 0) {
  throw new Error("forecast must not be only white space");
}
if (FORECAST.includes("\n") || FORECAST.includes("\r")) {
  throw new Error("forecast must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", FORECAST, "utf8");

// Read back what the grader will read and refuse a mismatch.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== FORECAST) {
  throw new Error("entry.txt does not match the forecast");
}
console.log(FORECAST);
console.log(`(${FORECAST.length} characters)`);
