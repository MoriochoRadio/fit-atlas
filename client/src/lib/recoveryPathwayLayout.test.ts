import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("recovery pathway responsive layout", () => {
  it("keeps a three-column desktop grid and a single-column mobile fallback", () => {
    const css = readFileSync(resolve(import.meta.dirname, "..", "index.css"), "utf8");
    expect(css).toContain(".pathway-grid { display: grid; grid-template-columns: 1.05fr 1fr 1fr;");
    expect(css).toContain("@media (max-width: 760px) { .recovery-pathway { padding: 20px; }.pathway-grid { grid-template-columns: 1fr; } }");
  });
});
