import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";

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

function vitePluginStorageProxy(): Plugin {
  return {
    name: "manus-storage-proxy",
    configureServer(server: ViteDevServer) {
      server.middlewares.use("/manus-storage", async (req, res) => {
        const key = req.url?.replace(/^\//, "");
        if (!key) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Missing storage key");
          return;
        }

        const forgeBaseUrl = (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "");
        const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;
        if (!forgeBaseUrl || !forgeKey) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Storage proxy not configured");
          return;
        }

        try {
          const forgeUrl = new URL("v1/storage/presign/get", `${forgeBaseUrl}/`);
          forgeUrl.searchParams.set("path", key);
          const forgeResponse = await fetch(forgeUrl, { headers: { Authorization: `Bearer ${forgeKey}` } });
          if (!forgeResponse.ok) {
            res.writeHead(502, { "Content-Type": "text/plain" });
            res.end("Storage backend error");
            return;
          }

          const { url } = (await forgeResponse.json()) as { url: string };
          if (!url) {
            res.writeHead(502, { "Content-Type": "text/plain" });
            res.end("Empty signed URL");
            return;
          }

          res.writeHead(307, { Location: url, "Cache-Control": "no-store" });
          res.end();
        } catch {
          res.writeHead(502, { "Content-Type": "text/plain" });
          res.end("Storage proxy error");
        }
      });
    },
  };
}
const repositoryBase = process.env.GITHUB_PAGES_BASE ?? "/fit-atlas/";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? repositoryBase : "/",
  plugins: [react(), tailwindcss(), vitePluginStorageProxy(), spaFallback()],
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
          if (id.includes("recharts")) return "charts";
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("@radix-ui")) return "radix-ui";
        },
      },
    },
  },
});
