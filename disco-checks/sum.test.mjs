import { test } from "node:test";
import assert from "node:assert/strict";
import { sum } from "./sum.mjs";

test("R4 fixture: sum adds two numbers @disco:tc-28ff76e5", () => {
  assert.equal(sum(1, 2), 3);
});
