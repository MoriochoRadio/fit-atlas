import { defineConfig } from "vitest/config";
import path from "node:path";

const projectRoot = import.meta.dirname;

export default defineConfig({
  resolve: { alias: { "@": path.resolve(projectRoot, "client", "src") } },
  test: {
    environment: "node",
    include: ["client/src/**/*.test.ts"],
    // Home은 한 화면에 전 장면을 렌더해서 jsdom에서 무겁다. 전체 스위트를 함께
    // 돌릴 때 일부 케이스가 기본 5초를 넘긴다(단독 실행 4.7초).
    testTimeout: 20000,
  },
});
