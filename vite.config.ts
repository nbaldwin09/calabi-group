import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@tanstack/react-router": fileURLToPath(new URL("./src/shims/router.tsx", import.meta.url)),
      "@tanstack/react-query": fileURLToPath(new URL("./src/shims/query.tsx", import.meta.url)),
      "@tanstack/react-start": fileURLToPath(new URL("./src/shims/start.ts", import.meta.url)),
    },
  },
  server: { host: "0.0.0.0", port: Number(process.env.PORT) || 5173 },
});
