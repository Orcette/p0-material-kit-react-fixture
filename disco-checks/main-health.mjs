// INI-117 R4 fixture: the push-only job. It fails main when main-state.mjs says main is broken.
import { broken } from "./main-state.mjs";

if (broken) {
  console.error("main-state.mjs marks main as broken.");
  process.exit(1);
}
console.log("main is healthy.");
