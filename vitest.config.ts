import { defineConfig } from "vitest/config";
import path from "node:path";

const projectRoot = import.meta.dirname;

export default defineConfig({
  resolve: { alias: { "@": path.resolve(projectRoot, "client", "src") } },
  test: { environment: "node", include: ["client/src/**/*.test.ts"] },
});
