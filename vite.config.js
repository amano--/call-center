import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwind from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwind(),
  ],
  resolve: {
    alias: {
      "~shadcn": path.resolve(__dirname, "./src/auto/shadcn"),
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
