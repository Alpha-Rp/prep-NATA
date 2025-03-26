import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    hmr: {
      overlay: false, // Disable the HMR overlay to reduce UI clutter
    },
    // Handle client-side routing
    proxy: {},
    middlewareMode: false,
  },
  preview: {
    port: 5000,
  },
  base: "/",
});
