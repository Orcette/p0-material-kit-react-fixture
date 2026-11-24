import { test } from "node:test";
import assert from "node:assert/strict";
import { sum } from "./sum.mjs";

test("sum adds two numbers @disco:tc-af7c4733", () => {
  assert.equal(sum(1, 2), 3);
});
