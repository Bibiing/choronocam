import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    proxy: {
      "/api": "https://chronocamm.vercel.app",
      "/auth": "https://chronocamm.vercel.app",
      "/upload": "https://chronocamm.vercel.app",
      "/images": "https://chronocamm.vercel.app",
    },
  },
});
