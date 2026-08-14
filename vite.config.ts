import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

const projectRoot = import.meta.dirname;
const repositoryBase = process.env.GITHUB_PAGES_BASE ?? "/fit-atlas/";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? repositoryBase : "/",
  plugins: [react(), tailwindcss()],
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
