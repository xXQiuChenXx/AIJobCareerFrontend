import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    proxy: {
      "/api": {
        target: process.env.BACKEND_API_URL,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy, _options) => {
          // @ts-ignore
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("[PROXY] Sending request to:", proxyReq.path);
          });
          proxy.on("error", (err, _req, res) => {
            console.error("[PROXY ERROR]", err);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Proxy error");
          });
        },
      },
    },
  },
});
