import { defineConfig } from "vite";

export default defineConfig({
  base: "/legal-compass-harare/",
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
  },
});
