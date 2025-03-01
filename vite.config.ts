import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import tsChecker from "vite-plugin-checker";
import eslintPlugin from "@nabla/vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tsChecker({ typescript: true }),
    eslintPlugin(),
  ],
  server: {
    port: 3000,
  },
});
