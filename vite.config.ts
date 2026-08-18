import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";

const projectRoot = import.meta.dirname;

/**
 * GitHub Pages는 없는 경로에 자기 기본 404 페이지를 준다.
 * 빌드 산출물의 index.html을 404.html로 복사해 앱이 직접 404를 그리게 한다.
 */
function spaFallback(): Plugin {
  return {
    name: "spa-404-fallback",
    apply: "build",
    closeBundle() {
      const out = path.resolve(projectRoot, "dist");
      const index = path.join(out, "index.html");
      if (fs.existsSync(index)) fs.copyFileSync(index, path.join(out, "404.html"));
    },
  };
}
const repositoryBase = process.env.GITHUB_PAGES_BASE ?? "/fit-atlas/";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? repositoryBase : "/",
  plugins: [react(), tailwindcss(), spaFallback()],
  resolve: { alias: { "@": path.resolve(projectRoot, "client", "src") } },
  root: path.resolve(projectRoot, "client"),
  publicDir: path.resolve(projectRoot, "client", "public"),
  build: {
    outDir: path.resolve(projectRoot, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react-dom") || id.includes("/react/")) return "react-runtime";
          if (id.includes("lucide-react")) return "icons";
          if (id.includes("sonner")) return "feedback";
        },
      },
    },
  },
});
